import path from "node:path";
import OpenAI from 'openai';
import fs from 'fs/promises';
import { spawn } from "node:child_process";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import "dotenv/config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import instructions_prompt from "./prompt.js";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
if (!accessKeyId || !secretAccessKey || !region || !bucketName) {
    throw new Error("AWS credentials are missing");
}
const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});
const openAIClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
function parseCodeBlock(input) {
    const pyRe = /```(?:\s*python)?\s*([\s\S]*?)```/i;
    const match = input.match(pyRe);
    if (match && match[1] !== undefined)
        return match[1].trim();
    return input.replace(/^["'\s`]+|["'\s`]+$/g, "").trim();
}
const runDocker = (jobDir) => {
    return new Promise((resolve, reject) => {
        const docker = spawn("docker", [
            "run",
            "--rm",
            "-v",
            `${jobDir}:/workspace`,
            "manimcommunity/manim:stable",
            "manim",
            "-qm",
            "/workspace/main.py",
            "MyScene",
            "-o",
            "/workspace/output"
        ]);
        docker.stdout.on("data", d => console.log(d.toString()));
        docker.stderr.on("data", d => console.error(d.toString()));
        docker.on("close", code => {
            if (code === 0)
                resolve();
            else
                reject(new Error(`Docker exited with ${code}`));
        });
    });
};
// Important Function
const renderManim = async (code) => {
    const jobId = crypto.randomUUID();
    const jobDir = path.join(process.cwd(), "job", jobId);
    await fs.mkdir(jobDir, { recursive: true });
    await fs.writeFile(path.join(jobDir, "main.py"), code);
    await runDocker(jobDir);
    return path.join(jobDir, "output.mp4");
};
const uploadVideoToS3 = async (filePath, s3Objectkey) => {
    try {
        const fileBuffer = await fs.readFile(filePath);
        const uploadParams = {
            Bucket: bucketName,
            Key: s3Objectkey,
            Body: fileBuffer,
            ContentType: "video/mp4"
        };
        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);
    }
    catch (error) {
        console.log("Failed to upload video to S3", error);
        throw new Error("S3 upload Failed");
    }
};
const generateManimCode = async (userPrompt) => {
    const gpt_response = await openAIClient.responses.create({
        model: "gpt-4.1",
        // reasoning: { effort: "medium" },
        instructions: instructions_prompt,
        input: userPrompt,
    });
    return parseCodeBlock(gpt_response.output_text);
};
const getObjectURL = async (key) => {
    const command = new GetObjectCommand({
        Bucket: "synthiq",
        Key: key
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
};
const processAnimationRequest = async (userPrompt, onProgress) => {
    const emit = (status, message, data) => {
        if (onProgress)
            onProgress(status, message, data);
    };
    try {
        emit("STARTING", "Starting generation...");
        emit("GENERATING_CODE", "Writing Manim code with AI...");
        const manim_code = await generateManimCode(userPrompt);
        emit("RENDERING", "Rendering video with Manim...");
        const videoFilePath = await renderManim(manim_code);
        emit("UPLOADING", "Uploading video to Cloud...");
        const s3Objectkey = crypto.randomUUID() + '.mp4';
        await uploadVideoToS3(videoFilePath, s3Objectkey);
        // Delete the local job folder 
        try {
            await fs.rm(path.dirname(videoFilePath), { recursive: true, force: true });
        }
        catch (err) {
            console.error("Failed to delete local job directory:", err);
        }
        const videoURL = await getObjectURL(s3Objectkey);
        emit("DONE", "Video generation complete", { url: videoURL, code: JSON.stringify(manim_code) });
        return videoURL;
    }
    catch (error) {
        console.error("Error generating Manim code or processing video:", error);
        emit("ERROR", error.message || "An error occurred");
        throw error;
    }
};
export { processAnimationRequest };
//# sourceMappingURL=utils.js.map