import { PolicyCard } from "./PolicyCard";
import type { Policy } from "../data/types";

type PolicyListProps = {
  policies: Policy[];
};

export function PolicyList({ policies }: PolicyListProps) {
  return (
    <>
      <div className="flex flex-col gap-4 ">
        {policies.map((policy) => (
          <PolicyCard key={policy.policyNumber} {...policy} />
        ))}
      </div>
    </>
  );
}
