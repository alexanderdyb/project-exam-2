import { useState, useCallback } from "react";

export default function useDeleteApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const deleteItem = useCallback(async (urlDelete, token) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage("");
    setIsSuccess(false);

    try {
      const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const response = await fetch(urlDelete, {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(
          responseData.message || `HTTP error status: ${response.status}`
        );
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { deleteItem, isLoading, isError, errorMessage, isSuccess };
}
