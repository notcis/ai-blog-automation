"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumbs() {
  // Get the current path from Next.js router
  const pathName = usePathname();

  // Split the path into segments and filter out any empty segments
  const pathSegments = pathName.split("/").filter((segment) => segment !== "");

  // If there are no segments, return null (no breadcrumbs to display)
  if (pathSegments.length === 0) {
    return null;
  }
  return (
    <div className=" flex items-center text-sm text-gray-500 space-x-2 mx-2">
      <Link href="/" className=" hover:underline">
        Home
      </Link>
      {pathSegments.map((segment, index) => {
        // Create the path for the current segment
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        return (
          <React.Fragment key={index}>
            <ChevronRightIcon size={16} />
            <Link href={href} className="hover:underline capitalize">
              {segment.replace(/-/g, " ")}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}
