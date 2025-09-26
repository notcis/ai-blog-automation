import { adminGetAllUsersDb } from "@/actions/auth.action";
import BlogPagination from "@/components/blog/blog-pagination";
import UserCard from "@/components/user/user-card";
import { UserType } from "@/lib/types";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const currentPage = page ? parseInt(page, 10) : 1;
  const limit = 10;

  const { users, totalCount, pagination } = await adminGetAllUsersDb(
    currentPage,
    limit
  );

  return (
    <div className="md:mt-0">
      <div className="p-5">
        <h1 className="text-2xl font-bold">Explore users</h1>
        <p className="text-sm text-gray-500">Total users: {totalCount}</p>
        <br />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {users.map((user: UserType) => {
            return (
              <div key={user.id} className="relative">
                <UserCard user={user} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <BlogPagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </div>
    </div>
  );
}
