/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { getProviders, signIn, ClientSafeProvider } from 'next-auth/react';
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function SignInPage() {


    return (
        <SessionProvider>
            <div className='flex h-screen min-w-screen items-center justify-center bg-gradient-to-r from-neutral-800 to-zinc-900'>

                <div className='flex mx-60 my-5 h-[90%] w-full rounded-4xl bg-black'>
                    <div className='w-[40%]'>
                        <img src="/image/signup_Image.png" className='w-fit h-[100%] rounded-4xl p-2' alt="" />
                    </div>
                    <div className='w-[60%]'>
                        <GoogleSign />
                    </div>
                </div>
            </div>
        </SessionProvider>
    );
}

const GoogleSign = () => {
    const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };
        fetchProviders();
    }, []);

    useEffect(() => {
        if (session.status === "authenticated") {
            router.push('/dashboard');
        }
    }, [session.status, router]);

    return <div className="flex items-center justify-center h-[100%] font-mono">
        <div className='flex flex-col items-center justify-center rounded-md shadow-2xl'>
            <div className="text-2xl font-semibold mb-8">Sign in to Your Account</div>
            {providers &&
                Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <div
                            onClick={() => signIn(provider.id)}
                            className='cursor-pointer'
                        >
                            <img src='/icons/googleSI.svg' alt='Google Icon' className='w-55'></img>
                        </div>
                    </div>
                ))}
        </div>
    </div>
}
