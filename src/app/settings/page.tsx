'use client'
import Image from "next/image";
import {signOut} from "next-auth/react";

export default function SettingsPage() {
  return (
    <div className="w-full h-full flex justify-start items-start p-4">
      <button className="mainButton clickableItem" onClick={()=> {
        signOut()
      }}>
        <Image src="/icons/logout.svg" alt="back" className="ml-4" width={20} height={20} />
        <span style={{marginLeft: '0.5rem'}}>Logout</span>
      </button>
    </div>
  );
}
