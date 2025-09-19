import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import Breadcrumbs from "./breadcrumbs";

export default function TopNav() {
  return (
    <div>
      <nav className=" flex justify-between items-center m-2 border-b-2">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        </Link>
        <Link href="/dashboard/blog-automation">Blog Automation</Link>
        <ModeToggle />
      </nav>
      <nav>
        <Breadcrumbs />
      </nav>
    </div>
  );
}
