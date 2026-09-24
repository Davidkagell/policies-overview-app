import type { Policy, PolicyStatus } from "../data/types";
import { useUrlParams } from "./useUrlParams";

export type Filters = { products: string[]; statuses: PolicyStatus[] };

const STATUSES: PolicyStatus[] = ["Active", "Inactive"];

function readFilters(params: URLSearchParams): Filters {
  const statuses = params.getAll("status");
  return {
    products: params.getAll("produkt"),
    statuses: STATUSES.filter((status) => statuses.includes(status)),
  };
}

function writeFilters(params: URLSearchParams, filters: Filters) {
  params.delete("produkt");
  params.delete("status");
  filters.products.forEach((product) => params.append("produkt", product));
  filters.statuses.forEach((status) => params.append("status", status));
}

export function useFilters(policies: Policy[]) {
  const [filters, setFilters] = useUrlParams({
    get: readFilters,
    set: writeFilters,
  });

  const filteredPolicies = policies.filter(
    (policy) =>
      (filters.products.length === 0 ||
        filters.products.includes(policy.productName)) &&
      (filters.statuses.length === 0 ||
        filters.statuses.includes(policy.policyStatus)),
  );

  return { filters, setFilters, filteredPolicies };
}
