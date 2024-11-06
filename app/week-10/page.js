"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
    const { user, gitHubSignIn } = useUserAuth();
    const router = useRouter();

    const [localLoading, setLocalLoading] = useState(true);

    async function login() {
        await gitHubSignIn();
    }

    useEffect(() => {
        if (user !== undefined) {
            const timeoutId = setTimeout(() => {
                setLocalLoading(false);
            }, 1000);

            if (user) {
                clearTimeout(timeoutId);
                router.push("/week-10/shopping-list");
                setLocalLoading(false);
            }


            return () => clearTimeout(timeoutId);
        }
    }, [user, router, localLoading]);

    return (
        <div>
            {
                <div className="flex justify-center min-h-screen bg-gray-100">
                    {user == null && !localLoading ?
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-5xl font-bold p-4 text-black">Welcome!</h2>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={login}>Sign in with Github</button>
                        </div>
                        :
                        <p>Redirecting...</p>
                    }
                </div>


            }
        </div>
    );
}