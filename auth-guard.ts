import { redirect } from "next/navigation";
import { authCheckAction } from "./actions/auth.action";

export async function requireLogin() {
  const result = await authCheckAction();
  if (!result.success) {
    redirect("/login");
  }
  return result;
}
