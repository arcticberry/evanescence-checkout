import { useState, useEffect, useMemo } from "preact/hooks";

const useQuery = (queryKey, queryFn) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      setStatus("loading");

      try {
        const response = await queryFn();

        if (response.ok) {
          const data = await response.json();

          setData(data);
          setStatus("success");
        } else {
          throw new Error(response.statusText);
        }
      } catch (err) {
        setStatus("error");
        setData();
      }
    }

    loadData();
  }, [queryKey]);

  return {
    isIdle: status === "idle",
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "success",
    data,
  };
};

export default useQuery;
