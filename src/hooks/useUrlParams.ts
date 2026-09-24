import { useCallback, useEffect, useState } from "react";

type UseUrlParamsOptions<T> = {
  get: (params: URLSearchParams) => T;
  set: (params: URLSearchParams, value: T) => void;
};

export function useUrlParams<T>({
  get,
  set,
}: UseUrlParamsOptions<T>): [T, (value: T) => void] {
  const [value, setValueState] = useState(() =>
    get(new URLSearchParams(window.location.search)),
  );

  useEffect(() => {
    const syncFromUrl = () => {
      setValueState(get(new URLSearchParams(window.location.search)));
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [get]);

  const setValue = useCallback(
    (next: T) => {
      const params = new URLSearchParams(window.location.search);
      set(params, next);

      const query = params.toString();
      if (query !== window.location.search.slice(1)) {
        window.history.pushState(
          null,
          "",
          query ? `?${query}` : window.location.pathname,
        );
      }

      setValueState(next);
    },
    [set],
  );

  return [value, setValue];
}
