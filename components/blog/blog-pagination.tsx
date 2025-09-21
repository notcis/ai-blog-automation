import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronsRightIcon } from "lucide-react";

export default function BlogPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  return (
    <nav className="flex justify-center opacity-75 mb-10">
      <ul className="flex justify-center items-center space-x-2 mt-5">
        {page > 1 && (
          <li>
            <Link href={`?page=${Number(page) - 1}`}>
              <Button variant="outline">
                <ChevronLeftIcon />
              </Button>
            </Link>
          </li>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li key={p}>
            <Link href={`?page=${p}`}>
              <Button
                variant={Number(p) === Number(page) ? "secondary" : "ghost"}
              >
                {p}
              </Button>
            </Link>
          </li>
        ))}
        {page < totalPages && (
          <li>
            <Link href={`?page=${Number(page) + 1}`}>
              <Button variant="outline">
                <ChevronsRightIcon />
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
