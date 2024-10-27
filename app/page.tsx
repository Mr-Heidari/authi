import UserForm from "@/components/home/UserForm";
import Logo from "@/components/Logo";
import { SessionProvider } from "next-auth/react";


export default function Home() {
  return (
    <div className="w-full h-[100%]">
      <div className="absolute">
        <Logo width={110} height={40} />
      </div>
      <div className="flex h-full">
        <SessionProvider>
          <UserForm />
        </SessionProvider>
      </div>
    </div>
  );
}
