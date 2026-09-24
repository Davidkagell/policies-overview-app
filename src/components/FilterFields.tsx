import type { Dispatch, SetStateAction } from "react";
import type { Filters } from "../hooks/useFilters";
import { STATUS_OPTIONS, toggle } from "../lib/filterShared";

type FilterFieldsProps = {
  draft: Filters;
  setDraft: Dispatch<SetStateAction<Filters>>;
  productNames: string[];
};

export function FilterFields({
  draft,
  setDraft,
  productNames,
}: FilterFieldsProps) {
  return (
    <>
      <fieldset className="flex flex-col gap-3 border-0 p-0">
        <ul className="flex flex-col gap-3">
          {productNames.map((productName) => (
            <li key={productName}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={draft.products.includes(productName)}
                  onChange={() =>
                    setDraft((current) => ({
                      ...current,
                      products: toggle(current.products, productName),
                    }))
                  }
                  className="size-5 accent-slate-900"
                />
                <span className="text-xs">{productName}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="flex flex-col gap-3 border-0 p-0">
        <legend className="text-md my-4">Status</legend>
        <ul className="flex flex-col gap-3">
          {STATUS_OPTIONS.map(({ value, label }) => (
            <li key={value}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={draft.statuses.includes(value)}
                  onChange={() =>
                    setDraft((current) => ({
                      ...current,
                      statuses: toggle(current.statuses, value),
                    }))
                  }
                  className="size-5 accent-slate-900"
                />
                <span className="text-xs">{label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </>
  );
}
