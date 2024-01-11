import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useState, useEffect } from "react";

const url = "https://api.noroff.dev/api/v1/holidaze/venues";

export default function Home() {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function getVenues() {
      try {
        setIsError(false);
        setIsLoading(true);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const json = await response.json();
        setVenues(json);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(error.message);
      }
    }
    getVenues();
  }, []);

  console.log(venues);

  return (
    <>
      <section className="bg-[#E9E9E9] px-4 py-24">
        <h1 className="text-center">Book venue now</h1>
        <div className="text-center py-12">
          <Link className="btn">Register</Link>
        </div>
      </section>
      <section className="py-24 px-4">
        <div className="gap-4 grid mx-auto justify-center lg:grid-cols-3 md:grid-cols-2 max-w-7xl">
          {venues.map((venue) => (
            <Card
              image={venue.media[0]}
              title={venue.name}
              intro={venue.description}
              key={venue.id}
              id={venue.id}
            />
          ))}
        </div>
      </section>
    </>
  );
}
