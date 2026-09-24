import { useEffect } from "react";
import { FilterFields } from "./FilterFields";
import { useFilterDraft } from "../hooks/useFilterDraft";
import type { FilterProps } from "../lib/filterShared";

export function MobileFilter({
  policies,
  appliedFilters,
  onApply,
  onClose,
}: FilterProps) {
  const { draft, setDraft, productNames } = useFilterDraft(
    appliedFilters,
    policies,
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    if (!media.matches) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Filter"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <aside className="relative flex h-full w-full flex-col overflow-hidden bg-blue-50 text-left text-slate-900">
        <div className="sticky top-0 z-50 flex items-center justify-between gap-2 border-b border-blue-100 bg-blue-50 px-4 py-3">
          <h3 className="text-lg ">Typ av försäkring</h3>
          <button
            type="button"
            aria-label="Stäng filter"
            onClick={onClose}
            className="cursor-pointer text-2xl leading-none text-slate-700"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-6 overflow-y-auto px-4 py-4">
          <FilterFields
            draft={draft}
            setDraft={setDraft}
            productNames={productNames}
          />
        </div>

        <div className=" border-t border-blue-100 bg-blue-50 px-4 py-3">
          <button
            type="button"
            onClick={() => onApply(draft)}
            className="w-full cursor-pointer rounded-md bg-slate-900 px-4 py-3 font-medium text-white"
          >
            Visa försäkringar
          </button>
        </div>
      </aside>
    </div>
  );
}
