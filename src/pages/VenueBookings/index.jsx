import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { useAuthStore } from "../../store";
import Section from "../../components/Section";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import Table from "../../components/Table";

export default function VenueBookings() {
  let { id } = useParams();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const url = `${baseUrl}/venues/${id}?_bookings=true`;
  const { data, isLoading, isError, errorMessage } = useApi(url);
  const { isAuthenticated, venueManager } = useAuthStore();

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
          <Section background={"#f5f5f5"}>
            {isAuthenticated && venueManager ? (
              <div>
                <h1 className="text-center">{`All bookings for ${data.name}`}</h1>
                <h2 className="text-center pt-8 mb-8">List</h2>
                <div className="max-w-[1000px] mx-auto">
                  <Table data={data.bookings} />
                </div>
              </div>
            ) : (
              <div>
                <p className="text-center pt-6">
                  <Link to={"/login"} className="underline">
                    Login
                  </Link>{" "}
                  to see bookings for this venue.
                </p>
              </div>
            )}
          </Section>
        </>
      )}
    </>
  );
}
