'use client'
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const {data: session} = useSession();

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div>
      <p>Not signed in</p>
      <button onClick={() => signIn("github")} className="mainButton"><span>Sign in with GitHub</span></button>
    </div>
  );
}
