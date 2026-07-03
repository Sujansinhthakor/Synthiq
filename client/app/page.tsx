/* eslint-disable @next/next/no-img-element */
"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactPlayer from "react-player";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import LightRays from "../components/homebg";

export default function Home() {
  return (
    <SessionProvider>
      <HomePage />
    </SessionProvider>
  );
}

const HomePage = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="min-h-screen relative overflow-x-hidden">
<<<<<<< HEAD
<<<<<<< HEAD
      {/* First Section - Hero with DarkVeil Background */}
      <section className="w-full h-[95vh] relative flex flex-col">
        {/* Background only for first section */}
=======
      <section className="w-full h-[100vh] relative flex flex-col">
>>>>>>> 95832d6 (changes)
=======
      <section className="w-full h-[100vh] relative flex flex-col">
>>>>>>> 95832d6b9eef8b14ba58bb96bda8bc5498ab4c46
        <div className="w-full absolute inset-0 -z-10">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.5}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
<<<<<<< HEAD
<<<<<<< HEAD

        {/* Navbar */}
        <header className="absolute top-10 left-4 right-4 md:left-36 md:right-36 rounded-xl p-4 flex justify-between items-center z-50">
          <div className="flex gap-2 items-center cursor-pointer">
            <img src="/icons/icon2.png" alt="logo" className="w-15" />
            <div className="font-semibold font-mono text-xl md:text-2xl text-white">
              Synthiq
=======
=======
>>>>>>> 95832d6b9eef8b14ba58bb96bda8bc5498ab4c46
        <header className="absolute top-6 left-4 right-4 md:left-10 md:right-10 lg:left-20 lg:right-20 z-50">
          <div className="flex justify-between items-center rounded-2xl px-4 py-3 md:px-5 md:py-3.5 ">
            <Link href="/" className="flex gap-2.5 items-center group">
              <img
                src="./favicon.ico"
                alt="Synthiq logo"
                className="w-8 h-8 rounded-md"
              />
              <span className="font-semibold text-lg md:text-xl text-white tracking-tight">
                Synthiq
              </span>
<<<<<<< HEAD
            </Link>

            <div className="flex gap-3 md:gap-4 items-center">
              <nav className="hidden sm:flex items-center gap-1 text-sm">
                <Link
                  href="/dashboard"
                  className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
                >
                  Dashboard
                </Link>

                {session.status === "authenticated" ? (
                  <button
                    onClick={() => signOut()}
                    className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-150 cursor-pointer"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/signup"
                    className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
                  >
                    Sign In
                  </Link>
                )}
              </nav>

              <div className="hidden sm:block w-px h-5 bg-white/10" />

              <Link
                href="https://github.com/Sujansinhthakor/Synthiq"
                target="_blank"
                className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-1.5 text-sm font-medium text-zinc-200 hover:text-white hover:border-white/30 hover:bg-white/5 active:scale-[0.97] transition-all duration-150"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
                <span>Star on GitHub</span>
              </Link>
>>>>>>> 95832d6 (changes)
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex items-center gap-3 backdrop-blur-xl font-mono text-lg  rounded-lg px-4 py-2 border-2 border-zinc-300 bg-white/10">
              <Link
                href={"/dashboard"}
                className="cursor-pointer text-gray-200 hover:text-white hover:font-semibold hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
              >
                Dashboard
              </Link>

              {session.status === "authenticated" ? (
                <button
                  onClick={() => signOut()}
                  className="cursor-pointer text-gray-200 hover:text-white hover:font-semibold hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href={"/signup"}
                  className="cursor-pointer text-gray-300 hover:text-white hover:font-semibold hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                >
                  SignIn
                </Link>
              )}
            </div>

            <Link
              href={"https://github.com/Sujansinhthakor/Synthiq"}
              className=""
            >
              <RainbowButton className="text-lg px-4 py-5 border-2 ">
                <div className="flex gap-2 items-center">
                  <div>
                    <img src="/image/github.png" alt="" className="w-6" />
                  </div>
                  <div>Star on GitHub</div>
                </div>
              </RainbowButton>
=======
>>>>>>> 95832d6b9eef8b14ba58bb96bda8bc5498ab4c46
            </Link>

            <div className="flex gap-3 md:gap-4 items-center">
              <nav className="hidden sm:flex items-center gap-1 text-sm">
                <Link
                  href="/dashboard"
                  className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
                >
                  Dashboard
                </Link>

                {session.status === "authenticated" ? (
                  <button
                    onClick={() => signOut()}
                    className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-150 cursor-pointer"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/signup"
                    className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors duration-150"
                  >
                    Sign In
                  </Link>
                )}
              </nav>

              <div className="hidden sm:block w-px h-5 bg-white/10" />

              <Link
                href="https://github.com/Sujansinhthakor/Synthiq"
                target="_blank"
                className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-1.5 text-sm font-medium text-zinc-200 hover:text-white hover:border-white/30 hover:bg-white/5 active:scale-[0.97] transition-all duration-150"
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4"
                  aria-hidden="true"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                </svg>
                <span>Star on GitHub</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center font-sans px-4">
<<<<<<< HEAD
<<<<<<< HEAD
          <div className="flex flex-col gap-4 max-w-6xl text-center items-center">
            <div className="text-3xl md:text-6xl font-semibold text-white leading-tight px-50">
              Your Ideas, Brought to Life by AI.
            </div>
            <div className="text-lg md:text-md text-neutral-400 font-medium max-w-2xl px-20 text-balance">
              Enter a prompt, and let our AI transform it into captivating
              creation.
            </div>
            <div className="mt-5">
              <RainbowButton
=======
          <div className="flex flex-col gap-6 max-w-4xl text-center items-center">
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/15 text-zinc-300 text-sm font-medium px-4 py-1.5 rounded-full">
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              AI-Powered Animation Engine
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Your Ideas, Brought to Life by AI.
=======
          <div className="flex flex-col gap-6 max-w-4xl text-center items-center">
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/15 text-zinc-300 text-sm font-medium px-4 py-1.5 rounded-full">
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              AI-Powered Animation Engine
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Your Ideas, Brought to Life by AI.
>>>>>>> 95832d6b9eef8b14ba58bb96bda8bc5498ab4c46
            </h1>

            <p className="text-lg text-zinc-400 font-medium max-w-xl text-balance leading-relaxed">
              Enter a prompt, and let our AI transform it into a captivating
              Manim animation.
            </p>

            <div className="mt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
<<<<<<< HEAD
>>>>>>> 95832d6 (changes)
=======
>>>>>>> 95832d6b9eef8b14ba58bb96bda8bc5498ab4c46
                onClick={() => {
                  if (session.status === "unauthenticated") {
                    router.push("/signup");
                  } else {
                    router.push("/dashboard");
                  }
                }}
                className="cursor-pointer text-base px-7 py-3 rounded-xl font-semibold text-black bg-white hover:bg-zinc-200 active:scale-[0.97] transition-all duration-150 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_24px_-8px_rgba(255,255,255,0.35)]"
              >
                Try Synthiq →
              </button>


            </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======

            <p className="text-xs text-zinc-600 tracking-wide">
              No credit card required &nbsp;·&nbsp; Powered by GPT-4 &nbsp;·&nbsp; Open source
            </p>
>>>>>>> 95832d6b9eef8b14ba58bb96bda8bc5498ab4c46
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      </section>
<<<<<<< HEAD
      {/* Demo Section - Separate full screen section without DarkVeil */}
      <section className="flex flex-col overflow-hidden">
=======

            <p className="text-xs text-zinc-600 tracking-wide">
              No credit card required &nbsp;·&nbsp; Powered by GPT-4 &nbsp;·&nbsp; Open source
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      </section>

      <section className="relative flex flex-col overflow-hidden bg-black">
>>>>>>> 95832d6 (changes)
=======

      <section className="relative flex flex-col overflow-hidden bg-black">
>>>>>>> 95832d6b9eef8b14ba58bb96bda8bc5498ab4c46
        <div className="-mt-72 pt-2">
          <ContainerScroll
            titleComponent={
              <>
                <div className="font-semibold">
                  <span className="md:text-[6rem] font-bold leading-none bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                    Look for Yourself
                  </span>
                </div>
              </>
            }
          >
            <div className="m-0 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
              <ReactPlayer
                src="https://cdn.sujansinhthakor.com/Synthiq%20-%20Google%20Chrome%202026-07-02%2017-07-02%20-%20Trim.mp4"
                muted
                loop
                autoPlay
                playbackRate={2}
                style={{ width: "100%", height: "100%", background: "black" }}
              />
            </div>
          </ContainerScroll>
        </div>
      </section>
    </div>
  );
};