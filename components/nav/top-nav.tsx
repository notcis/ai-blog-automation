"use client";

import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import Breadcrumbs from "./breadcrumbs";
import { Button } from "../ui/button";
import { useAuthContext } from "@/context/auth";
import LoginModal from "../modal/login-modal";

export default function TopNav() {
  const { loginModalOpen, setLoginModalOpen, user, loggedIn } =
    useAuthContext();
  return (
    <div>
      <nav className=" flex justify-between items-center m-2 border-b-2">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        </Link>
        <Button
          variant="outline"
          onClick={() => setLoginModalOpen(!loginModalOpen)}
        >
          เข้าสู่ระบบ
        </Button>
        <Link href="/dashboard/blog-automation">Blog Automation</Link>
        <ModeToggle />
      </nav>
      <nav>
        <Breadcrumbs />
        <LoginModal />
      </nav>
    </div>
  );
}
