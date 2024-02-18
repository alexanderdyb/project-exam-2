import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useState, useEffect } from "react";
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
import useApi from "../../hooks/useApi";
import CarouselItem from "../../components/CarouselItem";
import { useAuthStore } from "../../store";
import { Link } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

export default function VenueDetails() {
  let { id } = useParams();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const url = `${baseUrl}/venues/${id}?_bookings=true`;
  const { data, isLoading, isError, errorMessage } = useApi(url);
  const [startDate, setStartDate] = useState(new Date());
  const [excludedDates, setExcludedDates] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isAuthenticated, venueManager } = useAuthStore();

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.media.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + data.media.length) % data.media.length
    );
  };

  useEffect(() => {
    if (data && data.bookings) {
      const datesToExclude = [];
      data.bookings.forEach((booking) => {
        let currentDate = new Date(booking.dateFrom);
        const endDate = new Date(booking.dateTo);

        while (currentDate <= endDate) {
          datesToExclude.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });

      setExcludedDates(datesToExclude);
    }
  }, [data]);

  console.log(data.bookings);

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
              {data && data.media && data.media.length > 0 ? (
                <div className="carousel w-full max-h-[300px] sm:max-h-[500px]">
                  {data.media.map((image, index) => (
                    <CarouselItem
                      image={data.media[currentImageIndex]}
                      name={data.name}
                      onNext={nextImage}
                      onPrev={prevImage}
                      key={index}
                      length={data.media.length}
                    />
                  ))}
                </div>
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
                <h1 className="mb-2">{data.name}</h1>
                <div className="flex items-center gap-2">
                  {data.rating !== 0 && (
                    <div className="flex items-center ">
                      <StarIcon />
                      <p className="font-bold text-[18px]">{`${data.rating}/5`}</p>
                    </div>
                  )}
                  {data.location &&
                    data.location.city &&
                    data.location.country && (
                      <p>{`${data.location.city}, ${data.location.country}`}</p>
                    )}
                </div>
                <div className="flex gap-6 mt-4">
                  <PriceTag price={data.price} />
                  <div className="flex gap-2 pb-4">
                    <LocalHotelIcon />
                    <p className="font-bold">{data.maxGuests} guests</p>
                  </div>
                </div>
                <p className="mt-4">
                  <span className="font-bold">Venue details:</span>{" "}
                  {data.description}
                </p>
              </div>
              <div className="border-t-2 py-8">
                {data.meta && data.meta.wifi && (
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
                {data.meta && data.meta.parking && (
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
                {data.meta && data.meta.pets && (
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
                {data.meta && data.meta.breakfast && (
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
          <Section background={"#f5f5f5"}>
            <div className="max-w-[800px] mx-auto text-center">
              <h2 className="text-center mx-auto mb-8">Available dates</h2>
              {data && (
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  excludeDates={excludedDates}
                  dateFormat="yyyy/MM/dd"
                  inline
                />
              )}
            </div>
            {isAuthenticated && !venueManager ? (
              <div className="mx-auto text-center pt-12 font-semibold">
                <Link
                  to={`/booking/${id}`}
                  className="btn bg-[#0D1130] text-white hover:text-white hover:bg-[#0D1130]"
                >
                  Book now
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-center pt-6">
                  <Link to={"/login"} className="underline">
                    Login
                  </Link>{" "}
                  or{" "}
                  <Link to={"/register"} className="underline">
                    {" "}
                    register
                  </Link>{" "}
                  as customer to book this venue
                </p>
              </div>
            )}
          </Section>
        </>
      )}
    </>
  );
}
