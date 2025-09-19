import LoginModal from "@/components/modal/login-modal";
import { Button } from "@/components/ui/button";
export default function HomePage() {
  return (
    <div className=" flex justify-center items-center h-screen">
      <Button>Click me</Button>
      <LoginModal />
    </div>
  );
}
