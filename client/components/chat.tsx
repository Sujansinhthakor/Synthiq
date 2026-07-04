"use client"

import { Chat } from "./chat_ai";
import { Bot, User, LoaderCircle, Check } from 'lucide-react'

type ChatsProps = {
    chats: Chat[] | undefined;
};

const Chats = ({ chats }: ChatsProps) => {
    return (
        <div className="flex flex-col gap-3 font-sans">
            {chats?.map((chat, index) => (
                <div
                    key={index}
                    className="flex animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                    <div className="flex gap-3 items-start p-3 rounded-xl max-w-[85%]">
                        {/* user messages */}
                        {chat.type === 'user' && (
                            <>
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/[0.08] flex items-center justify-center">
                                    <User size={14} className="text-zinc-400" />
                                </div>
                                <div className="text-sm text-zinc-100 leading-relaxed pt-0.5">{chat.text}</div>
                            </>
                        )}

                        {/* bot messages */}
                        {chat.type === 'bot' && (
                            <>
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/[0.08] flex items-center justify-center">
                                    <Bot size={14} className="text-zinc-400" />
                                </div>
                                <div className="flex gap-2 items-center pt-0.5">
                                    {chat.text === 'Video generation complete!' ? (
                                        <Check className="text-emerald-400" size={16} />
                                    ) : chat.text.startsWith('Error') || chat.text.startsWith('Failed') ? (
                                        <span className="text-red-400 text-sm">✕</span>
                                    ) : (
                                        <LoaderCircle className="animate-spin text-zinc-400" size={16} />
                                    )}
                                    <span className={`text-sm leading-relaxed ${chat.text === 'Video generation complete!'
                                            ? 'text-emerald-400'
                                            : chat.text.startsWith('Error') || chat.text.startsWith('Failed')
                                                ? 'text-red-400'
                                                : 'text-zinc-400'
                                        }`}>
                                        {chat.text}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Chats;