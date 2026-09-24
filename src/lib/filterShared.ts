import type { Policy, PolicyStatus } from "../data/types";
import type { Filters } from "../hooks/useFilters";

export type FilterProps = {
  policies: Policy[];
  appliedFilters: Filters;
  onApply: (filters: Filters) => void;
  onClose: () => void;
};

export const STATUS_OPTIONS: { value: PolicyStatus; label: string }[] = [
  { value: "Active", label: "Aktiva försäkringar" },
  { value: "Inactive", label: "Avslutade försäkringar" },
];

export function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function getProductNames(
  policies: Policy[],
  appliedProducts: string[],
): string[] {
  return [
    ...new Set([
      ...policies.map((policy) => policy.productName),
      ...appliedProducts,
    ]),
  ].sort((a, b) => a.localeCompare(b, "sv"));
}
