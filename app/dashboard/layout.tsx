import { requireLogin } from "@/auth-guard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await requireLogin();

  return <div>{children}</div>;
}
