import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginModal() {
  return (
    <Dialog open={true}>
      <form>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>เข้าสู่ระบบ</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="email">
                อีเมล
              </Label>
              <Input
                className="col-span-3"
                id="email"
                name="email"
                placeholder="กรุณากรอกอีเมล"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="password">
                รหัสผ่าน
              </Label>
              <Input
                className="col-span-3"
                id="password"
                name="password"
                placeholder="กรุณากรอกรหัสผ่าน"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">ยกเลิก</Button>
            </DialogClose>
            <Button type="submit">ตกลง</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
