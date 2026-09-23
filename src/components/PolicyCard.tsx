import type { Policy } from "../data/types";

export function PolicyCard({
  policyDescription,
  policyNumber,
  policyStartDate,
  policyStatus,
  productName,
  yearlyPrice,
}: Policy) {
  const monthlyPrice = Math.round(yearlyPrice / 12);
  const container = "p-2 flex flex-col items-start";

  return (
    <section className="flex flex-col border-2 border-blue-200 rounded-xl overflow-hidden">
      <div className={`flex flex-col bg-blue-100 ${container}`}>
        {policyStatus === "Inactive" && <p>Din försäkring har avslutats</p>}
        <ul className={`${container}`}>
          <li className="font-extrabold">{productName}</li>
          <li>{policyDescription}</li>
        </ul>
      </div>
      <ul
        className={`${container} w-full gap-0 divide-y divide-blue-200 items-stretch`}
      >
        <li className="w-full py-1 flex after:flex-1 after:content-['']">
          <p className="flex-1 text-left">Startdatum:</p>
          <p className="flex-1 text-center">{policyStartDate}</p>
        </li>
        <li className="w-full py-1 flex after:flex-1 after:content-['']">
          <p className="flex-1 text-left">Försäkringsnummer:</p>
          <p className="flex-1 text-center">{policyNumber}</p>
        </li>
        <li className="w-full py-1 flex after:flex-1 after:content-['']">
          <p className="flex-1 text-left">Pris per månad:</p>
          <p className="flex-1 text-center">{monthlyPrice} kr</p>
        </li>
      </ul>
    </section>
  );
}
