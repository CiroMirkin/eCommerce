"use server"

import { Footer } from "@/components";
import { auth } from "../../../auth.config";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session =  await auth()

  if(session?.user){
    redirect('/')
  }

  return (
    <main className="h-screen grid place-items-center px-6">
      <div className="w-full">
        { children }
      </div>
      <Footer className="mt-10 self-end" />
    </main>
  )
}