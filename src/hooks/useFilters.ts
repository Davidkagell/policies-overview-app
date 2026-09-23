import { useEffect, useState } from "react";
import type { Policy, PolicyStatus } from "../data/types";

export type Filters = { products: string[]; statuses: PolicyStatus[] };

const STATUSES: PolicyStatus[] = ["Active", "Inactive"];

function readFiltersFromUrl(): Filters {
  const params = new URLSearchParams(window.location.search);
  const statuses = params.getAll("status");
  return {
    products: params.getAll("produkt"),
    statuses: STATUSES.filter((status) => statuses.includes(status)),
  };
}

export function useFilters(policies: Policy[]) {
  const [filters, setFiltersState] = useState(readFiltersFromUrl);

  useEffect(() => {
    const syncFromUrl = () => setFiltersState(readFiltersFromUrl());
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  function setFilters(next: Filters) {
    const params = new URLSearchParams(window.location.search);
    params.delete("produkt");
    params.delete("status");
    next.products.forEach((product) => params.append("produkt", product));
    next.statuses.forEach((status) => params.append("status", status));

    const query = params.toString();
    if (query !== window.location.search.slice(1)) {
      window.history.pushState(
        null,
        "",
        query ? `?${query}` : window.location.pathname,
      );
    }
    setFiltersState(next);
  }

  const filteredPolicies = policies.filter(
    (policy) =>
      (filters.products.length === 0 ||
        filters.products.includes(policy.productName)) &&
      (filters.statuses.length === 0 ||
        filters.statuses.includes(policy.policyStatus)),
  );

  return { filters, setFilters, filteredPolicies };
}
