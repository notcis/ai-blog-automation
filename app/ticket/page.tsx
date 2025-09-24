"use client";

import { createTicketDb } from "@/actions/ticket.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export default function TicketPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ticketType, setTicketType] = useState("general-enquiry");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createTicketDb({
      email,
      message,
      ticketType,
    });
    if (!res.success) {
      toast.error(res.message || "Error creating ticket");
      setLoading(false);
      return;
    }
    toast.success(res.message || "Ticket created successfully");
    setEmail("");
    setMessage("");
    setLoading(false);
  };
  return (
    <Card className="w-full md:w-1/2 max-w-6xl mx-auto my-5 space-y-6">
      <CardHeader>
        <CardTitle>เปิดคำร้อง</CardTitle>
        <p className="text-gray-500">
          กรุณากรอกแบบฟอร์มด้านล่างเพื่อเปิดคำร้องขอสนับสนุน ทีมงานของเราจะ
          ติดต่อกลับหาคุณโดยเร็วที่สุด
        </p>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <Label htmlFor="email">อีเมล</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              required
            />
          </div>
          {/* Ticket Type Dropdown */}
          <div>
            <Label htmlFor="ticketType">ประเภทคำร้อง</Label>
            <Select
              value={ticketType}
              onValueChange={(value) => setTicketType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select ticket type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blog-automation">Blog Automation</SelectItem>
                <SelectItem value="general-enquiry">สอบถามทั่วไป</SelectItem>
                <SelectItem value="password-forgot">ลืมรหัสผ่าน</SelectItem>
                <SelectItem value="other">อื่นๆ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Message */}
          <div>
            <Label htmlFor="message">รายละเอียด</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={160}
              required
            />
            <div className="text-right text-sm text-gray-500">
              {message.length}/160 characters
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading || message.length > 160}
          >
            {loading ? "Please wait..." : "ส่งคำร้องขอ"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
