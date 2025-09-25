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
import { MenuIcon } from "lucide-react";

export default function TopNav() {
  const { loginModalOpen, setLoginModalOpen, user, loggedIn, logout } =
    useAuthContext();
  return (
    <div>
      <nav className="flex justify-end items-center pr-2.5 sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/blogs">Blogs</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/search">ค้นหา</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href="/dashboard/blog-automation">สร้าง Blog ด้วย AI</a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {loggedIn ? (
              <>
                <DropdownMenuItem>
                  <span className=" relative border p-2 rounded-md capitalize">
                    {user.name}
                    <span className="absolute top-0.4 right-0.5 h-2 w-2 bg-green-500 rounded-full"></span>
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard">แดชบอร์ด</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem>
                    <Link href="/admin">สำหรับผู้ดูแลระบบ</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={logout}>ออกจากระบบ</DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem
                onClick={() => setLoginModalOpen(!loginModalOpen)}
              >
                {" "}
                เข้าสู่ระบบ
              </DropdownMenuItem>
            )}

            <DropdownMenuItem>
              <ModeToggle />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <nav className="hidden sm:flex sm:space-y-0 sm:flex-row sm:justify-start sm:gap-4 sm:items-center m-2 p-2 border-b-2">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        </Link>

        <Link href="/blogs">
          <Button variant="outline">Blogs</Button>
        </Link>

        <Link href="/search">
          <Button variant="outline">ค้นหา</Button>
        </Link>

        <a href="/dashboard/blog-automation">
          <Button variant="outline">สร้าง Blog ด้วย AI</Button>
        </a>

        <div className="sm:ml-auto flex items-center space-x-2">
          {loggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className=" relative border p-2 rounded-md capitalize">
                  {user.name}
                  <span className="absolute top-0.4 right-0.5 h-2 w-2 bg-green-500 rounded-full"></span>
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <div className="flex flex-col">
                  <DropdownMenuLabel asChild>
                    <Link href="/dashboard">แดชบอร์ด</Link>
                  </DropdownMenuLabel>
                  {user.role === "admin" && (
                    <DropdownMenuLabel asChild>
                      <Link href="/admin">สำหรับผู้ดูแลระบบ</Link>
                    </DropdownMenuLabel>
                  )}
                </div>
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
          <ModeToggle />
        </div>
      </nav>
      <nav>
        <Breadcrumbs />
        <LoginModal />
      </nav>
    </div>
  );
}
