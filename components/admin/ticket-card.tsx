"use client";

import { TicketType } from "@/lib/types";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { toggleTicketStatusDb } from "@/actions/ticket.action";

dayjs.extend(relativeTime);

export default function TicketCard({ ticket }: { ticket: TicketType }) {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async () => {
    setLoading(true);
    if (!ticket.id) {
      toast.error("Ticket ID is missing");
      setLoading(false);
      return;
    }
    const res = await toggleTicketStatusDb(ticket.id);
    if (!res.success) {
      toast.error(res.message || "Failed to update ticket status");
      setLoading(false);
      return;
    }
    toast.success(res.message || "Ticket status updated successfully");
    setLoading(false);
  };
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-col pb-2">
        <CardTitle className="text-lg line-clamp-1 mt-2">
          {ticket?.ticketType || "Ticket Type"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm mb-4">
          <p>{ticket.message}</p>
          <div className="flex justify-between">
            <p className="text-gray-500">
              by {ticket?.user?.name || "Unknown User"}
            </p>
            <p className="text-gray-500">{ticket.email}</p>
          </div>
        </div>
        <div className="space-y-2">{dayjs(ticket.createdAt).fromNow()}</div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          {/* Status Buttons */}
          <div>
            {ticket.status === "open" ? (
              <div>
                <Button
                  variant="outline"
                  disabled
                  className="text-green-500 mr-2"
                  onClick={handleStatusChange}
                >
                  {loading ? <Loader2Icon className="animate-spin" /> : "Open"}
                </Button>
                <Button onClick={handleStatusChange} variant="outline">
                  Close
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={handleStatusChange}
                  variant="outline"
                  disabled
                  className="text-red-500 mr-2"
                >
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Closed"
                  )}
                </Button>
                <Button onClick={handleStatusChange} variant="outline">
                  Reopen
                </Button>
              </div>
            )}
          </div>
          {/* Copy Button */}
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(ticket.email);
              toast.success("Email address copied to clipboard!");
            }}
          >
            Reply
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
