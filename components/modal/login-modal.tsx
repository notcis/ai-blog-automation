"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/auth";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const {
    user,
    setUser,
    loading,
    loginModalOpen,
    setLoginModalOpen,
    handleLoginSubmit,
  } = useAuthContext();

  const router = useRouter();

  const forgotPasswordClick = () => {
    setLoginModalOpen(false);
    router.push("/ticket");
  };

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
          <div className="flex justify-end items-center space-x-2">
            <Button disabled={loading || !user.email} type="submit">
              {loading ? (
                <Loader2Icon className="animate-spin w-4 h-4 mr-2" />
              ) : null}
              เข้าสู่ระบบ
            </Button>
            <Button onClick={forgotPasswordClick} variant="destructive">
              Forgot Password?
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
