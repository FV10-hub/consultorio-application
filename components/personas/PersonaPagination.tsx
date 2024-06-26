import Link from "next/link";

type PersonaPaginationProps = {
  page: number;
  totalPages: number;
};

export default function PersonaPagination({
  page,
  totalPages,
}: PersonaPaginationProps) {
  const pages = Array.from({ length: totalPages }, (init, i) => i + 1);
  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <Link
          href={`/personas?page=${page - 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &laquo;
        </Link>
      )}
      {pages.map((pagina) => {
        return (
          <Link
            key={pagina}
            href={`/personas?page=${pagina}`}
            className={`${pagina === page && 'bg-cyan-500 hover:bg-cyan-600 shadow-sm text-white hover:text-white'} outline-none transition-all duration-300 bg-gray-400 px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
          >
            {pagina}
          </Link>
        );
      })}
      {page < totalPages && (
        <Link
          href={`/personas?page=${page + 1}`}
          className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
}
