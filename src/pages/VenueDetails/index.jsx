// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

export default function VenueDetails() {
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  // let { id } = useParams();

  // useEffect(() => {
  //   async function getData(url) {
  //     try {
  //       setIsLoading(true);
  //       setIsError(false);

  //       const response = await fetch(url);
  //       if (!response.ok) {
  //         throw new Error(response.status);
  //       }
  //       const json = await response.json();

  //       setData(json);
  //       setIsLoading(false);
  //     } catch (error) {
  //       setIsLoading(false);
  //       setIsError(true);
  //       setErrorMessage(error.message);
  //     }
  //   }

  //   getData(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
  // }, [id]);

  // console.log(data);

  return (
    <section>
      <p>Detailspage</p>
    </section>
  );
}
