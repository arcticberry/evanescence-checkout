import { useState, useEffect } from "preact/hooks";
import useQuery from "./useQuery";

const useApplicationVendors = (publicKey) => {
  return useQuery("application-vendors", () =>
    fetch(
      `${process.env.PREACT_APP_API_BASE_URL}/application/application-service-vendors`,
      {
        headers: {
          "x-api-key": publicKey,
        },
      }
    )
  );
};

export default useApplicationVendors;
