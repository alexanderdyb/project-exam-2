import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import { store } from "../../store";
import InfiniteScroll from "react-infinite-scroll-component";
import Hero from "../../components/Hero";
import Message from "../../components/Message";
import Section from "../../components/Section";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Home() {
  const { venues, isLoading, isError, errorMessage, fetchVenues } = store();
  const [isMoreData, setIsMoreData] = useState(true);

  useEffect(() => {
    fetchVenues(
      `https://api.noroff.dev/api/v1/holidaze/venues?limit=10&offset=0`
    );
  }, [fetchVenues]);

  const fetchMoreVenues = () => {
    const newOffset = venues.length;
    const newUrl = `https://api.noroff.dev/api/v1/holidaze/venues?limit=10&offset=${newOffset}`;

    fetchVenues(newUrl, (newDataLength) => {
      if (newDataLength < 10) {
        setIsMoreData(false);
      }
    });
  };

  return (
    <>
      <Hero
        image="/heroImage2.webp"
        title="Where Every Stay is a Story"
        link="/"
        buttonName="Register Now"
      />
      <div className="max-w-7xl mx-auto pt-12 px-4 text-center md:text-left mb-[-30px]">
        <SearchBar />
      </div>
      <InfiniteScroll
        dataLength={venues.length}
        next={fetchMoreVenues}
        hasMore={isMoreData && !isError}
        scrollThreshold="80%"
        pullDownToRefreshThreshold={50}
        endMessage={
          !isError && <p className="text-center pb-24">No more data to load.</p>
        }
      >
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
      </InfiniteScroll>
    </>
  );
}
