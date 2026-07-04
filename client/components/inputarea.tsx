"use client";

import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Chat } from "./chat_ai";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface MyInputProps {
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  setUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSnippet: React.Dispatch<React.SetStateAction<string>>;
  chats: Chat[] | undefined;
  pendingPrompt?: string | null;
  clearPendingPrompt?: () => void;
}

export function InputArea(props: MyInputProps) {
  const { data: session } = useSession();
  const idToken = session?.user?.customenToken;

  const [inputValue, setInputValue] = useState("");


  // When a prompt chip is clicked, populate the input
  useEffect(() => {
    if (props.pendingPrompt) {
      setInputValue(props.pendingPrompt);
      props.clearPendingPrompt?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pendingPrompt]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleOnClick = async () => {
    if (
      inputValue.length > 0 &&
      (props.chats == undefined ||
        props.chats.at(props.chats.length - 1)?.type != "user")
    ) {
      const currentInput = inputValue;
      setInputValue(""); // Clear the input field while processing

      props.setChats((prev) => [...prev, { text: currentInput, type: "user" }]);
      props.setChats((prev) => [...prev, { text: "Connecting to server...", type: "bot" }]);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log(apiUrl);
        const response = await fetch(`${apiUrl}/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + idToken,
          },
          body: JSON.stringify({ prompt: currentInput }),
        });

        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const messages = buffer.split("\n\n");
          buffer = messages.pop() || "";

          for (const message of messages) {
            if (message.startsWith("data: ")) {
              try {
                const data = JSON.parse(message.replace("data: ", ""));

                if (data.status === "DONE") {
                  props.setUrl(data.url);
                  toast('Remember to download your video and copy your code! Unsaved progress is lost on page refresh.', {
                    duration: 2000,
                    position: 'bottom-right',
                    icon: 'ℹ️',
                  });
                  if (data.code) {
                    props.setSnippet(JSON.parse(data.code));
                  }
                  props.setChats((prev) => [
                    ...prev.slice(0, -1),
                    { text: "Video generation complete!", type: "bot" },
                  ]);
                } else if (data.status === "ERROR") {
                  props.setChats((prev) => [
                    ...prev.slice(0, -1),
                    { text: `Error: ${data.message}`, type: "bot" },
                  ]);
                } else {
                  props.setChats((prev) => [
                    ...prev.slice(0, -1),
                    { text: data.message, type: "bot" },
                  ]);
                }
              } catch (e) {
                console.error("Failed to parse SSE chunk", e);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error generating video:", error);
        props.setChats((prev) => [
          ...prev.slice(0, -1),
          { text: "Failed to connect to server.", type: "bot" },
        ]);
      }
    }
  };

  const isActive = inputValue.length > 0;

  return (
    <div className="flex items-center gap-3 rounded-xl bg-layer-2 px-4 py-3 transition-colors duration-200 focus-within:bg-layer-3">
      <input
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleOnClick();
          }
        }}
        value={inputValue}
        className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
        placeholder="Describe your animation..."
      />
      <button
        onClick={handleOnClick}
        disabled={!isActive}
        className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 ${isActive
          ? "bg-white text-black hover:bg-zinc-200 active:scale-[0.95] cursor-pointer"
          : "bg-layer-3 text-zinc-600 cursor-not-allowed"
          }`}
      >
        <Send size={16} />
      </button>
    </div>
  );
}
