"use client"

import { useState } from "react";
import { InputArea } from "./inputarea";
import Chats from "./chat";


export interface Chat {
    text: string,
    type: 'user' | 'bot' | 'stop'
}

interface MyMainDivProps {
    setUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
    setSnippet: React.Dispatch<React.SetStateAction<string>>
}

const examplePrompts = [
    {
        label: "Circle to square",
        prompt: "Create a blue circle that smoothly transforms into a square"
    },
    {
        label: "Pythagorean theorem",
        prompt: "Show a visual proof of the Pythagorean theorem using squares on a right triangle"
    },
    {
        label: "Sine wave",
        prompt: "Draw a point moving in a circle while tracing out a sine wave"
    },
    {
        label: "Derivative slope",
        prompt: "Animate a tangent line moving along a curve to explain derivatives"
    },
    {
        label: "Recursion tree",
        prompt: "Visualize the recursive calls made when calculating factorial of 5"
    }
];

const ChatAI = (props: MyMainDivProps) => {
    const [chats, setChats] = useState<Chat[]>([]);
<<<<<<< HEAD
<<<<<<< HEAD

    return (
        <div className="flex flex-col h-full pt-5">
            <div className="flex-1 overflow-y-auto no-scrollbar">
                <Chats chats={chats} />
=======
    const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

    const handleChipClick = (prompt: string) => {
        setPendingPrompt(prompt);
    };

    return (
=======
    const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

    const handleChipClick = (prompt: string) => {
        setPendingPrompt(prompt);
    };

    return (
>>>>>>> 95832d6b9eef8b14ba58bb96bda8bc5498ab4c46
        <div className="flex flex-col h-full">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
                {chats.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center gap-5 text-center max-w-sm mx-auto">
                        <div className="w-11 h-11 rounded-xl bg-white/[0.06] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600">
                                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-400">Describe your animation</p>
                            <p className="text-xs text-zinc-600 mt-1">AI will generate a Manim animation from your prompt</p>
                        </div>

                        {/* Example prompt  */}
                        <div className="flex flex-wrap justify-center gap-2 mt-1">
                            {examplePrompts.map((item) => (
                                <button
                                    key={item.label}
                                    onClick={() => handleChipClick(item.prompt)}
                                    className="px-3 py-1.5 text-xs text-zinc-400 bg-white/[0.04] hover:bg-white/[0.08] hover:text-zinc-100 rounded-lg active:scale-[0.95] transition-all duration-150 cursor-pointer"
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <Chats chats={chats} />
                )}
<<<<<<< HEAD
>>>>>>> 95832d6 (changes)
=======
>>>>>>> 95832d6b9eef8b14ba58bb96bda8bc5498ab4c46
            </div>

            {/* Input area */}
            <div className="p-4 pt-2">
                <InputArea
                    setChats={setChats}
                    chats={chats}
                    setUrl={props.setUrl}
                    setSnippet={props.setSnippet}
                    pendingPrompt={pendingPrompt}
                    clearPendingPrompt={() => setPendingPrompt(null)}
                />
            </div>
        </div>
    );
}
export default ChatAI;