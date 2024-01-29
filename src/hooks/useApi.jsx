import { useState, useEffect } from "react";

export default function useApi(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url]);
  return { data, isLoading, isError, errorMessage };
}
