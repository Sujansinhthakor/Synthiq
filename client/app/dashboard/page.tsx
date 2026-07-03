/* eslint-disable @next/next/no-img-element */
"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Code, ChevronDown } from "lucide-react";
import Code_Block from "@/components/code";
import ChatAI from "@/components/chat_ai";

const Dashboard = () => {
  return (
    <SessionProvider>
      <DashboardPage />
    </SessionProvider>
  );
};

const DashboardPage = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/signup");
    }
  }, [session.status, router]);

  const [url, setUrl] = useState<undefined | string>();
  const [codeOpen, setCodeOpen] = useState(false);
  const [snippet, setSnippet] = useState(`from manim import *
config.background_color = BLACK
class MyScene(Scene):
    def construct(self):
        circle = Circle(radius=2, color=BLUE)
        self.play(Create(circle))
        self.wait(2)`);

  const code = [
    {
      language: "python",
      filename: "app.py",
      code: `${snippet}`,
    },
  ];

  const handleLogout = () => {
    signOut();
    router.push("/");
  }
  return (
    <div className="flex flex-col w-full h-screen bg-layer-0">
      {/* Navbar — only structural border on the page */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-layer-0/80 backdrop-blur-md z-50">
        <Link href="/" className="flex gap-2.5 items-center">
          <img
            src="/favicon.ico"
            alt="Synthiq logo"
            className="w-7 h-7 rounded-lg"
          />
          <span className="font-semibold text-lg text-zinc-100 tracking-tight">
            Synthiq
          </span>
        </Link>

        <div className="flex gap-3 items-center">
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 active:scale-[0.95] transition-all duration-150"
            >
              Home
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 active:scale-[0.95] transition-all duration-150 cursor-pointer"
            >
              Logout
            </button>
          </nav>

          <div className="w-px h-5 bg-white/8" />

          <Link
            href="https://github.com/Sujansinhthakor/Synthiq"
            target="_blank"
            className="flex items-center gap-2 rounded-lg bg-layer-2 px-3 py-1.5 text-sm font-medium text-zinc-200 hover:text-white hover:bg-layer-3 active:scale-[0.95] transition-all duration-150"
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            <span>GitHub</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 min-h-0">
        {/* Left panel — Chat */}
        <div className="w-1/2 flex flex-col">
          <ChatAI setUrl={setUrl} setSnippet={setSnippet} />
        </div>

        {/* Right panel — Video + Code overlay */}
        <div className="w-1/2 flex flex-col bg-layer-1 relative overflow-hidden">
          {/* Video section — always takes full height */}
          <div className="flex-1 p-4 flex items-center justify-center">
            <div className="w-full max-w-[90%] aspect-video rounded-xl overflow-hidden bg-layer-2 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              {url ? (
                <ReactPlayer
                  autoPlay
                  src={url}
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "black",
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="36"
                      height="36"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-zinc-600"
                    >
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                    <p className="text-xs text-zinc-600">
                      Your animation will appear here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Code overlay — slides up over the video from the bottom */}
          <div
            className={`absolute bottom-0 left-0 right-0 z-10 bg-layer-3 shadow-[0_-4px_16px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out flex flex-col ${codeOpen ? "h-1/2" : "h-auto"
              }`}
          >
            {/* Toggle bar */}
            <button
              onClick={() => setCodeOpen(!codeOpen)}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-150 cursor-pointer flex-shrink-0"
            >
              <Code size={14} />
              <span>View code</span>
              <ChevronDown
                size={14}
                className={`ml-auto transition-transform duration-200 ${codeOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* Scrollable code content */}
            {codeOpen && (
              <div className="flex-1 overflow-y-auto px-4 pb-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
                <Code_Block code={code} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
