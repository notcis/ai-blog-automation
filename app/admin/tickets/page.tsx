import { adminGetAllTicketsDb } from "@/actions/ticket.action";
import TicketCard from "@/components/admin/ticket-card";
import BlogPagination from "@/components/blog/blog-pagination";
import { TicketType } from "@/lib/types";

export default async function AdminTicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;

  const currentPage = page ? parseInt(page, 10) : 1;
  const limit = 10;

  const { tickets, totalCount, openCount, closedCount, pagination } =
    await adminGetAllTicketsDb(currentPage, limit);
  return (
    <div className="md:mt-0">
      <div className="p-5">
        <h1 className="text-2xl font-bold">Manage tickets</h1>
        <p className="text-sm text-gray-500">
          Total tickets: {totalCount} | Open: {openCount} | Closed:{" "}
          {closedCount}
        </p>
        <br />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tickets.map((ticket: TicketType) => {
            return (
              <div key={ticket.id} className="relative">
                <TicketCard ticket={ticket} />
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
