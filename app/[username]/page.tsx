import { getUserByUsernameDb } from "@/actions/auth.action";
import UserCard from "@/components/user/user-card";
import { UserType } from "@/lib/types";

export default async function page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await getUserByUsernameDb(username);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 md:mt-0">
        <p className="text-center text-gray-500">User not found.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen mt-[-100px]">
      <UserCard user={user as UserType} />
    </div>
  );
}
