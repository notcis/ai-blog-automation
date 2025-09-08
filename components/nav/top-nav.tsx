import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";

export default function TopNav() {
  return (
    <div className=" flex justify-between items-center m-2 border-b-2">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
      </Link>
      <Link href="/dashboard/blog-automation">Blog Automation</Link>
      <ModeToggle />
    </div>
  );
}
