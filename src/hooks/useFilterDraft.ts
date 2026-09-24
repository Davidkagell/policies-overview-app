import { useState } from "react";
import type { Policy } from "../data/types";
import type { Filters } from "../hooks/useFilters";
import { getProductNames } from "../lib/filterShared";

export function useFilterDraft(appliedFilters: Filters, policies: Policy[]) {
  const [draft, setDraft] = useState(appliedFilters);
  const productNames = getProductNames(policies, appliedFilters.products);
  return { draft, setDraft, productNames };
}
