import Card from "../../components/Card";
import Loading from "../../components/Loading";
import { useEffect } from "react";
import { store } from "../../store";
import Hero from "../../components/Hero";

const url = `https://api.noroff.dev/api/v1/holidaze/venues?limit=12?offset=0`;

export default function Home() {
  const { venues, isLoading, isError, errorMessage, fetchVenues } = store();

  useEffect(() => {
    fetchVenues(url);
  }, [fetchVenues]);

  console.log(venues);

  return (
    <>
      <Hero
        image="/heroImage2.webp"
        title="Where Every Stay is a Story"
        link="/register"
        buttonName="Register Now"
      />
      {isLoading ? (
        <div className="mx-auto text-center pt-12">
          <Loading />
        </div>
      ) : isError ? (
        <div>{errorMessage} Error fetching data. Please try again later.</div>
      ) : (
        <section className="py-24 px-4">
          <div className="gap-4 grid mx-auto justify-center lg:grid-cols-3 md:grid-cols-2 max-w-7xl">
            {venues.map((venue) => (
              <Card
                image={venue.media[0]}
                title={venue.name}
                meta={venue.meta}
                price={venue.price}
                key={venue.id}
                id={venue.id}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
