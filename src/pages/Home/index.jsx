import React, { useEffect } from "react";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import { store } from "../../store";
import Hero from "../../components/Hero";
import Message from "../../components/Message";
import Section from "../../components/Section";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home() {
  const { venues, isLoading, isError, errorMessage, fetchVenues } = store();
  const url = `${process.env.REACT_APP_BASE_URL}/venues?sort=created&sortOrder=desc`;

  useEffect(() => {
    fetchVenues(url);
  }, [fetchVenues, url]);

  console.log(venues);

  return (
    <>
      <Hero
        image="/heroImage2.webp"
        title="Where Every Stay is a Story"
        link="/"
        buttonName="Register Now"
        alt="Cabin out in the woods"
      />
      <div className="max-w-7xl mx-auto pt-12 px-4 text-center md:text-left mb-[-30px]">
        <SearchBar />
      </div>

      {isLoading ? (
        <Section>
          <div className="max-w-7xl mx-auto text-center">
            <Loading />
          </div>
        </Section>
      ) : isError ? (
        <Section>
          <div className="max-w-[500px] mx-auto">
            <Message
              text={`${errorMessage} Error fetching data. Please try again later.`}
              type={"error"}
            />
          </div>
        </Section>
      ) : (
        <Section>
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
        </Section>
      )}
    </>
  );
}
