"use client";
import { signIn, signOut } from "next-auth/react"

export const Appbar = () => {
    return <div className="flex flex-row items-center justify-center gap-5">
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => signIn()}>Signin</button>
    <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => signOut()}>Sign out</button>
  </div>
} 