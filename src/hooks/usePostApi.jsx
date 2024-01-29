import { useState, useEffect } from "react";

export default function usePostApi(url, body, token = null) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function postData() {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");

        const headers = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        });

        const responseData = await response.json(); // Parse the response as JSON

        if (!response.ok) {
          // More robust error checking
          if (
            responseData &&
            Array.isArray(responseData.errors) &&
            responseData.errors.length > 0
          ) {
            const message = responseData.errors[0].message;
            throw new Error(
              message || `HTTP error! status: ${response.status}`
            );
          } else {
            throw new Error(
              responseData.message || `HTTP error! status: ${response.status}`
            );
          }
        }

        setData(responseData);
      } catch (error) {
        console.error("Error:", error);
        setIsError(true);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (url && body) {
      postData();
    }
  }, [url, body, token]);

  return { data, isLoading, isError, errorMessage };
}
