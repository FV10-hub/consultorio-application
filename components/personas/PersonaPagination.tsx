import Link from "next/link";

type PersonaPaginationProps = {
  page: number;
  totalPages: number;
};

export default function PersonaPagination({
  page,
  totalPages,
}: PersonaPaginationProps) {
  // Mostrar solo un subconjunto de páginas alrededor de la actual
  const getVisiblePages = () => {
    const visiblePages = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    if (startPage > 1) {
      visiblePages.push(1);
      if (startPage > 2) {
        visiblePages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        visiblePages.push('...');
      }
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };
  return (
    <nav className="flex items-center justify-center gap-1 py-6">
      {/* Botón Anterior */}
      <Link
        href={`/personas?page=${page - 1}`}
        className={`flex h-10 w-10 items-center justify-center rounded-md border ${page === 1 ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
        aria-disabled={page === 1}
        tabIndex={page === 1 ? -1 : 0}
      >
        <span className="sr-only">Anterior</span>
        &laquo;
      </Link>

      {/* Números de página */}
      {getVisiblePages().map((pagina, index) => {
        if (pagina === '...') {
          return (
            <span key={`ellipsis-${index}`} className="flex h-10 w-10 items-center justify-center">
              ...
            </span>
          );
        }

        return (
          <Link
            key={pagina}
            href={`/personas?page=${pagina}`}
            className={`flex h-10 w-10 items-center justify-center rounded-md border ${pagina === page ? 'border-cyan-600 bg-cyan-600 text-white' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
            aria-current={pagina === page ? 'page' : undefined}
          >
            {pagina}
          </Link>
        );
      })}

      {/* Botón Siguiente */}
      <Link
        href={`/personas?page=${page + 1}`}
        className={`flex h-10 w-10 items-center justify-center rounded-md border ${page === totalPages ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
        aria-disabled={page === totalPages}
        tabIndex={page === totalPages ? -1 : 0}
      >
        <span className="sr-only">Siguiente</span>
        &raquo;
      </Link>
    </nav>
  );
}
