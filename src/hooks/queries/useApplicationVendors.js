import { useState, useEffect } from "preact/hooks";

const useApplicationVendors = (publicKey) => {
  const [status, setStatus] = useState("idle");
  const [data, setData] = useState();

  useEffect(() => {
    async function loadData() {
      setStatus("loading");

      try {
        const response = await fetch(
          `${process.env.PREACT_APP_API_BASE_URL}/application/application-service-vendors`,
          {
            headers: {
              "x-api-key": publicKey,
            },
          }
        );
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
  }, [publicKey]);

  return {
    isIdle: status === "idle",
    isLoading: status === "loading",
    isError: status === "error",
    isSuccess: status === "success",
    data,
  };
};

export default useApplicationVendors;
