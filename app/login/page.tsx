"use client";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { loginModalOpen, setLoginModalOpen, loggedIn } = useAuthContext();

  useEffect(() => {
    if (!loggedIn) {
      setLoginModalOpen(true);
    } else {
      router.push("/dashboard");
    }
  }, [loggedIn]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Button
        variant="outline"
        className="mt-[-100px]"
        onClick={() => setLoginModalOpen(!loginModalOpen)}
      >
        Login
      </Button>
    </div>
  );
}
