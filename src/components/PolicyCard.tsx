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
    <section className=" flex flex-col border-2 border-blue-100 rounded-md overflow-hidden">
      <div
        className={`flex flex-col bg-blue-50 ${container} px-0! border-b border-b-blue-100`}
      >
        {policyStatus === "Inactive" && (
          <p className="bg-red-100 text-red-800 rounded-full m-1.5 px-2 py-1  text-xs border border-blue-200">
            Din försäkring har avslutats
          </p>
        )}
        <ul className={`${container}`}>
          <li className="font-bold text-xl">{productName}</li>
          <li>{policyDescription}</li>
        </ul>
      </div>
      <ul
        className={`${container} w-full gap-0 divide-y divide-blue-100 items-stretch`}
      >
        <li className="grid w-full grid-cols-2 items-center py-1 truncate">
          <p className="font-bold text-left truncate">Startdatum:</p>
          <p className="text-left">{policyStartDate}</p>
        </li>
        <li className="grid w-full grid-cols-2 items-center py-1">
          <p className="font-bold text-left truncate">Försäkringsnummer:</p>
          <p className="text-left ">{policyNumber}</p>
        </li>
        <li className="grid w-full grid-cols-2 items-center py-1">
          <p className="font-bold text-left truncate">Pris per månad:</p>
          <p className="text-left">{monthlyPrice} kr</p>
        </li>
      </ul>
    </section>
  );
}
