"use client";

import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import Breadcrumbs from "./breadcrumbs";
import { Button } from "../ui/button";
import { useAuthContext } from "@/context/auth";
import LoginModal from "../modal/login-modal";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TopNav() {
  const { loginModalOpen, setLoginModalOpen, user, loggedIn, logout } =
    useAuthContext();
  return (
    <div>
      <nav className=" flex justify-between items-center m-2 border-b-2">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        </Link>

        {loggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className=" relative border p-2 rounded-md capitalize">
                {user.name}
                <span className="absolute top-0.4 right-0.5 h-2 w-2 bg-green-500 rounded-full"></span>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>ออกจากระบบ</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="outline"
            onClick={() => setLoginModalOpen(!loginModalOpen)}
          >
            เข้าสู่ระบบ
          </Button>
        )}

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
