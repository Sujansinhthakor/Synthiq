"use client";
import type { BundledLanguage } from "@/components/ui/kibo-ui/code-block";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from "@/components/ui/kibo-ui/code-block";

type MyCodeBlock = {
  language: string;
  filename: string;
  code: string;
};
interface CodeBlockProps {
  code: MyCodeBlock[];
}
const Code_Block = (props: CodeBlockProps) => (
  <CodeBlock
    data={props.code}
    defaultValue={props.code[0].language}
    className="overflow-auto max-h-96 rounded-xl
    [&::-webkit-scrollbar]:w-1.5
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-white/10
  hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
  >
    <CodeBlockHeader>
      <CodeBlockFiles>
        {(item) => (
          <CodeBlockFilename key={item.language} value={item.language}>
            {item.filename}
          </CodeBlockFilename>
        )}
      </CodeBlockFiles>
      <CodeBlockSelect>
        <CodeBlockSelectTrigger>
          <CodeBlockSelectValue />
        </CodeBlockSelectTrigger>
        <CodeBlockSelectContent>
          {(item) => (
            <CodeBlockSelectItem
              className="hover:cursor-pointer"
              key={item.language}
              value={item.language}
            >
              {item.language}
            </CodeBlockSelectItem>
          )}
        </CodeBlockSelectContent>
      </CodeBlockSelect>
      <CodeBlockCopyButton
        className="hover:cursor-pointer"
        onCopy={() => console.log("Copied code to clipboard")}
        onError={() => console.error("Failed to copy code to clipboard")}
      />
    </CodeBlockHeader>
    <CodeBlockBody>
      {(item) => (
        <CodeBlockItem key={item.language} value={item.language}>
          <CodeBlockContent language={item.language as BundledLanguage}>
            {item.code}
          </CodeBlockContent>
        </CodeBlockItem>
      )}
    </CodeBlockBody>
  </CodeBlock>
);
export default Code_Block;
