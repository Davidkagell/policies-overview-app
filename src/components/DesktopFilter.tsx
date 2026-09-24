import { FilterFields } from "./FilterFields";
import { useFilterDraft } from "../hooks/useFilterDraft";
import type { FilterProps } from "../lib/filterShared";

export function DesktopFilter({
  policies,
  appliedFilters,
  onApply,
  onClose,
}: FilterProps) {
  const { draft, setDraft, productNames } = useFilterDraft(
    appliedFilters,
    policies,
  );

  return (
    <aside className="flex flex-col gap-4  border border-blue-100 bg-blue-50 p-4 text-left text-slate-900">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-md">Typ av försäkring</h3>
        <button
          type="button"
          aria-label="Stäng filter"
          onClick={onClose}
          className="cursor-pointer text-xl leading-none text-slate-700"
        >
          ×
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <FilterFields
          draft={draft}
          setDraft={setDraft}
          productNames={productNames}
        />
      </div>

      <button
        type="button"
        onClick={() => onApply(draft)}
        className="w-1/2 cursor-pointer rounded-xs bg-slate-900  py-2 font-medium whitespace-nowrap text-[clamp(0.5rem,1vw,0.75rem)] text-white"
      >
        Visa försäkringar
      </button>
    </aside>
  );
}
