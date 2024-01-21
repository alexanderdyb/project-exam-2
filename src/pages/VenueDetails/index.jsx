import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useEffect } from "react";
import { store } from "../../store";
import Section from "../../components/Section";
import Message from "../../components/Message";
import PlaceIcon from "@mui/icons-material/Place";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import PriceTag from "../../components/PriceTag";

export default function VenueDetails() {
  let { id } = useParams();
  const { venueDetails, isLoading, isError, errorMessage, fetchVenueDetails } =
    store();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const url = `${baseUrl}/${id}`;

  useEffect(() => {
    fetchVenueDetails(url);
  }, [fetchVenueDetails, url]);

  console.log(venueDetails);

  return (
    <>
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
          <div className="grid grid-cols-1 gap-4 mx-auto max-w-[800px]">
            {venueDetails &&
            venueDetails.media &&
            venueDetails.media.length > 0 ? (
              venueDetails.media.map((image, index) => (
                <div className="sm:max-h-[500px] max-h-[300px]" key={index}>
                  <img
                    src={image || "/noimage.webp"}
                    alt={venueDetails.name}
                    className="object-cover h-full w-full"
                  />
                </div>
              ))
            ) : (
              <div className="sm:max-h-[500px] max-h-[300px]">
                <img
                  src="/noimage.webp"
                  alt="No image available"
                  className="object-cover h-full w-full"
                />
              </div>
            )}
            <div>
              <h1 className="mb-4">{venueDetails.name}</h1>
              <PriceTag price={venueDetails.price} />
              <div className="flex gap-6 mt-4">
                {venueDetails?.location?.city && (
                  <div className="flex gap-2">
                    <PlaceIcon />
                    <p>{venueDetails.location.city}</p>
                  </div>
                )}
                <div className="flex gap-2">
                  <LocalHotelIcon />
                  <p>Max {venueDetails.maxGuests} guests</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
