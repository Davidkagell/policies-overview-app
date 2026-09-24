import { useEffect } from "react";
import { useUrlParams } from "./useUrlParams";

function readPage(params: URLSearchParams) {
  const raw = Number(params.get("sida"));
  return Number.isInteger(raw) && raw > 0 ? raw : 1;
}

function writePage(params: URLSearchParams, page: number) {
  params.delete("sida");
  if (page > 1) {
    params.set("sida", String(page));
  }
}

export function usePagination<T>(items: T[], itemsPerPage: number) {
  const [pageFromUrl, setCurrentPage] = useUrlParams({
    get: readPage,
    set: writePage,
  });
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
  const currentPage = Math.min(pageFromUrl, totalPages);
  const showPagination = items.length > itemsPerPage;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = showPagination
    ? items.slice(startIndex, startIndex + itemsPerPage)
    : items;

  useEffect(() => {
    if (items.length > 0 && pageFromUrl > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [items.length, pageFromUrl, setCurrentPage, totalPages]);

  return {
    currentPage,
    setCurrentPage,
    visibleItems,
    showPagination,
  };
}
