import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useState, useEffect } from "react";
import { store } from "../../store";
import Section from "../../components/Section";
import Message from "../../components/Message";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PetsIcon from "@mui/icons-material/Pets";
import StarIcon from "@mui/icons-material/Star";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import PriceTag from "../../components/PriceTag";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function VenueDetails() {
  let { id } = useParams();
  const { venueDetails, isLoading, isError, errorMessage, fetchVenueDetails } =
    store();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const url = `${baseUrl}/${id}`;
  const [startDate, setStartDate] = useState(new Date());

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
        <>
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
                    alt="Graphic that shows that there is no data"
                    className="object-cover h-full w-full"
                  />
                </div>
              )}
              <div className="pb-5">
                <h1 className="mb-2">{venueDetails.name}</h1>
                <div className="flex items-center gap-2">
                  {venueDetails.rating !== 0 && (
                    <div className="flex items-center ">
                      <StarIcon />
                      <p className="font-bold text-[18px]">{`${venueDetails.rating}/5`}</p>
                    </div>
                  )}
                  {venueDetails.location &&
                    venueDetails.location.city &&
                    venueDetails.location.country && (
                      <p>{`${venueDetails.location.city}, ${venueDetails.location.country}`}</p>
                    )}
                </div>
                <div className="flex gap-6 mt-4">
                  <PriceTag price={venueDetails.price} />
                  <div className="flex gap-2 pb-4">
                    <LocalHotelIcon />
                    <p className="font-bold">{venueDetails.maxGuests} guests</p>
                  </div>
                </div>
                <p className="mt-4">
                  <span className="font-bold">Venue details:</span>{" "}
                  {venueDetails.description}
                </p>
              </div>
              <div className="border-t-2 py-8">
                {venueDetails.meta && venueDetails.meta.wifi && (
                  <div className="pb-4">
                    <div className="flex items-center gap-2">
                      <WifiIcon /> <p className="font-bold">Wifi</p>
                    </div>
                    <div>
                      <p>
                        Stay connected with our WiFi, available throughout the
                        property for your convenience
                      </p>
                    </div>
                  </div>
                )}
                {venueDetails.meta && venueDetails.meta.parking && (
                  <div className="pb-4">
                    <div className="flex items-center gap-2">
                      <LocalParkingIcon /> <p className="font-bold">Parking</p>
                    </div>
                    <div>
                      <p>
                        Enjoy the ease of on-site parking, providing secure and
                        accessible space for your vehicle during your stay
                      </p>
                    </div>
                  </div>
                )}
                {venueDetails.meta && venueDetails.meta.pets && (
                  <div className="pb-4">
                    <div className="flex items-center gap-2">
                      <PetsIcon /> <p className="font-bold">Pets</p>
                    </div>
                    <div>
                      <p>
                        We're a pet-friendly destination, so bring along your
                        furry friends to enjoy the vacation as much as you do
                      </p>
                    </div>
                  </div>
                )}
                {venueDetails.meta && venueDetails.meta.breakfast && (
                  <div className="pb-4">
                    <div className="flex items-center gap-2">
                      <RestaurantIcon /> <p className="font-bold">Breakfast</p>
                    </div>
                    <div>
                      <p>We offer breakfast to our guests</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section>
          <Section>
            <div className="max-w-[800px]">
              <h2 className="text-center mx-auto">Book your stay</h2>
            </div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </Section>
        </>
      )}
    </>
  );
}
