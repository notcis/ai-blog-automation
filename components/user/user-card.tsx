"use client";

import { UserType } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function UserCard({ user }: { user: UserType }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="max-w-sm p-4 shadow-md rounded-lg w-full">
      {/* Card Header: User name, email, and username */}
      <CardHeader className="space-y-4">
        <Link href={`${process.env.NEXT_PUBLIC_DOMAIN}/${user.username}`}>
          <Button variant="outline" className="w-full">
            {process.env.NEXT_PUBLIC_DOMAIN}/{user.username}
          </Button>
        </Link>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-sm text-gray-400">{user.username}</p>
        </div>
        <p className="text-sm text-gray-500">{user.email}</p>
      </CardHeader>
      {/* Card Body: Role and Website */}
      <CardContent className="space-y-1">
        <p className="text-sm text-gray-700">Role: {user.role}</p>
        {user.website && (
          <p className="text-sm text-gray-500">
            Website:{" "}
            <a
              href={
                user.website.startsWith("http://") ||
                user.website.startsWith("https://")
                  ? user.website
                  : `https://${user.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              {user.website}
            </a>
          </p>
        )}
        <p className="text-xs text-gray-400">
          Joined: {dayjs(user.createdAt).fromNow()}
        </p>
      </CardContent>
      {/* Card Footer: Collapsible Section for About */}
      <CardFooter className="mt-3">
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              {open ? "Hide About" : "Show About"}
            </Button>
          </CollapsibleTrigger>
          {/* Collapsible Content: About */}
          <CollapsibleContent className="overflow-hidden">
            <div className="mt-2 text-sm text-gray-600 transition-all duration-300 ease-in-out max-h-64">
              {/* Ensure that the about content has a max height when
opened */}
              {user.about ? user.about : "No about informationavailable."}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardFooter>
    </Card>
  );
}
