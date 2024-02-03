import { useState, useEffect } from "react";
import { useAuthStore } from "../store";

export default function useAuth(url, body, token = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useAuthStore();

  useEffect(() => {
    async function postData() {
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMessage("");
        setIsSuccess(false);

        const headers = {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        });

        const responseData = await response.json();

        if (!response.ok) {
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
        setIsSuccess(true);
        const { accessToken, venueManager } = responseData;

        login(accessToken, venueManager);
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
  }, [url, body, token, login]);

  return { isLoading, isError, errorMessage, isSuccess };
}
