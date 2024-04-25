import Link from "next/link";
import { Ficha } from '@prisma/client';

type FichaPaginationProps = {
  page: number;
  totalPages: number;
};

export default function FichaPagination({
  page,
  totalPages,
}: FichaPaginationProps) {
  const pages = Array.from({ length: totalPages }, (init, i) => i + 1);
  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <Link
          href={`/fichas?page=${page - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &laquo;
        </Link>
      )}
      {pages.map((pagina) => {
        return (
          <Link
            key={pagina}
            href={`/fichas?page=${pagina}`}
            className={`${pagina === page && 'font-black'} bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
          >
            {pagina}
          </Link>
        );
      })}
      {page < totalPages && (
        <Link
          href={`/fichas?page=${page + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
