import { authCheckAction } from "@/actions/auth.action";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await authCheckAction();
  if (!result.success) {
    return <div>{result.message}</div>;
  }

  if (!result.user || result.user.role !== "admin") {
    return <div>Access Denied</div>;
  }
  return <div>{children}</div>;
}
