"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/auth";
import { Loader2Icon } from "lucide-react";

export default function LoginModal() {
  const {
    user,
    setUser,
    loading,
    loginModalOpen,
    setLoginModalOpen,
    handleLoginSubmit,
  } = useAuthContext();

  return (
    <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>เข้าสู่ระบบ</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLoginSubmit} className=" space-y-4">
          <Input
            className="col-span-3"
            id="email"
            name="email"
            type="email"
            placeholder="กรุณากรอกอีเมล"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />

          <Input
            className="col-span-3"
            id="password"
            name="password"
            placeholder="กรุณากรอกรหัสผ่าน"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />

          <Button disabled={loading || !user.email} type="submit">
            {loading ? (
              <Loader2Icon className="animate-spin w-4 h-4 mr-2" />
            ) : null}
            เข้าสู่ระบบ
          </Button>
        </form>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
