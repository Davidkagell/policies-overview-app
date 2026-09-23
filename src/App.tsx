import { useEffect, useState } from "react";
import { fetchPolicies } from "./data/policies";
import type { Policy } from "./data/types";
import { PolicyList } from "./components/PolicyList";

function App() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPolicies() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchPolicies();
        if (!cancelled) {
          setPolicies(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Kunde inte hämta försäkringar",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadPolicies();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <h1>Mina försäkringar</h1>

      {isLoading && <p>Laddar försäkringar...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && policies.length === 0 && (
        <p>Inga försäkringar hittades.</p>
      )}
      {!isLoading && !error && policies.length > 0 && (
        <PolicyList policies={policies} />
      )}
    </>
  );
}

export default App;
