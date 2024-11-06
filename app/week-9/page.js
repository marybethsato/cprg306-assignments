"use client"

import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    async function login() {
        await gitHubSignIn();
    }

    async function logout() {
        await firebaseSignOut();
    }

    return (
        <div>
            {
                <div className="flex justify-center min-h-screen bg-gray-100">
                    {user == null ?
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-5xl font-bold p-4 text-black">Welcome!</h2>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={login}>Sign in with Github</button>
                        </div>
                        :
                        <div className="flex flex-col items-center justify-center">
                            <p className="center text-black p-4 text-2xl">
                                Welcome, {user.displayName} {user.email}!
                            </p>
                            <a className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-10" href="/week-9/shopping-list">Continue to shopping list</a>
                            <button className="px-4 py-2 bg-black text-white rounded hover:bg-blue-700 transition" onClick={logout}>Logout</button>
                        </div>
                    }
                </div>


            }
        </div>
    );
}