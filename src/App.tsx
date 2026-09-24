import { useEffect, useState } from "react";
import { fetchPolicies } from "./data/policies";
import type { Policy } from "./data/types";
import { PolicyList } from "./components/PolicyList";
import { MobileFilter } from "./components/MobileFilter";
import { DesktopFilter } from "./components/DesktopFilter";
import { Pagination } from "./components/Pagination";
import { useFilters } from "./hooks/useFilters";
import type { Filters } from "./hooks/useFilters";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useUrlParams } from "./hooks/useUrlParams";

const ITEMS_PER_PAGE = 5;

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

function App() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pageFromUrl, setCurrentPage] = useUrlParams({
    get: readPage,
    set: writePage,
  });
  const { filters, setFilters, filteredPolicies } = useFilters(policies);
  const isMobile = useMediaQuery("(max-width: 767px)");

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPolicies.length / ITEMS_PER_PAGE),
  );
  const currentPage = Math.min(pageFromUrl, totalPages);
  const showPagination = filteredPolicies.length > ITEMS_PER_PAGE;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visiblePolicies = showPagination
    ? filteredPolicies.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : filteredPolicies;

  useEffect(() => {
    if (pageFromUrl > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [pageFromUrl, totalPages, setCurrentPage]);

  useEffect(() => {
    let cancelled = false;

    async function loadPolicies() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchPolicies();
        if (!cancelled) {
          setPolicies(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Kunde inte hämta försäkringar",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadPolicies();

    return () => {
      cancelled = true;
    };
  }, []);

  function handleApply(next: Filters) {
    setFilters(next);
    setCurrentPage(1);
    setIsFilterOpen(false);
  }

  function handleClose() {
    setIsFilterOpen(false);
  }

  const filterProps = {
    policies,
    appliedFilters: filters,
    onApply: handleApply,
    onClose: handleClose,
  };

  return (
    <>
      <h1 className="text-3xl mt-4 font-bold text-center">Mina försäkringar</h1>

      {isLoading && <p className="text-center mt-4">Laddar försäkringar...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && policies.length === 0 && (
        <p>Inga försäkringar hittades.</p>
      )}

      {!isLoading && !error && policies.length > 0 && (
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 mb-4">
          <div className="col-span-3 mx-4 md:col-span-2 md:col-start-2">
            <div className="mb-4 flex items-start justify-between gap-4">
              {showPagination ? (
                <Pagination
                  currentPage={currentPage}
                  totalItems={filteredPolicies.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={setCurrentPage}
                />
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="rounded-xs border border-slate-300 px-4 py-2 cursor-pointer text-xs"
              >
                Filtrera
              </button>
            </div>

            {filteredPolicies.length === 0 ? (
              <p>Inga försäkringar matchar filtret.</p>
            ) : (
              <PolicyList policies={visiblePolicies} />
            )}
          </div>

          {isFilterOpen &&
            (isMobile ? (
              <MobileFilter {...filterProps} />
            ) : (
              <div className="col-start-4 mr-4">
                <DesktopFilter {...filterProps} />
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default App;
