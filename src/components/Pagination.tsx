type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <nav aria-label="Paginering" className="flex flex-col gap-1">
      <div className="flex items-center gap-1 text-slate-400">
        <button
          type="button"
          aria-label="Föregående sida"
          disabled={isFirstPage}
          onClick={() => onPageChange(currentPage - 1)}
          className="cursor-pointer px-1 py-0.5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          &lt;
        </button>

        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              aria-label={`Sida ${page}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onPageChange(page)}
              className={
                isActive
                  ? "cursor-pointer rounded-sm bg-slate-900 px-2 py-0.5 text-sm text-white"
                  : "cursor-pointer px-2 py-0.5 text-sm text-slate-400"
              }
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          aria-label="Nästa sida"
          disabled={isLastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="cursor-pointer px-1 py-0.5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          &gt;
        </button>
      </div>

      <p className="text-xs text-slate-400">
        Visar {startItem}–{endItem} av {totalItems} försäkringar
      </p>
    </nav>
  );
}
