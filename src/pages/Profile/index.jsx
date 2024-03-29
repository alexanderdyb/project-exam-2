import Section from "../../components/Section";
import useApi from "../../hooks/useApi";
import { useAuthStore } from "../../store";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Card from "../../components/Card";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import formatDate from "../../hooks/useFormatDate";
import useDeleteApi from "../../hooks/useDeleteApi";
import DialogModal from "../../components/DialogModal";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Profile() {
  const [dataVersion, setDataVersion] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState("");
  const {
    deleteItem,
    isError: deleteIsError,
    errorMessage: deleteErrorMessage,
    isSuccess: deleteIsSuccess,
  } = useDeleteApi();
  const { userName, token, isAuthenticated, venueManager } = useAuthStore();
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const url = `${baseUrl}/profiles/${userName}?_bookings=true&_venues=true&version=${dataVersion}`;

  const { data, isLoading, isError, errorMessage } = useApi(url, token);
  const currentDate = new Date().toISOString();

  const handleVenueId = (itemId) => {
    setSelectedItemId(itemId);
  };

  useEffect(() => {
    if (deleteIsSuccess) {
      setDataVersion((v) => v + 1);
    }
  }, [deleteIsSuccess]);

  const handleDelete = async () => {
    const urlDelete = `${baseUrl}/venues/${selectedItemId}`;
    await deleteItem(urlDelete, token);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          {isLoading && !deleteIsSuccess ? (
            <Section>
              <div className="max-w-7xl mx-auto text-center">
                <Loading />
              </div>
            </Section>
          ) : isError && !deleteIsSuccess ? (
            <Section>
              <div className="max-w-[500px] mx-auto ">
                <Message
                  text={`${errorMessage} Error fetching data. Please try again later.`}
                  type={"error"}
                />
              </div>
            </Section>
          ) : (
            <>
              <Section>
                <div className="flex flex-col md:flex-row text-center md:text-left mx-auto gap-6 pt-8 md:gap-12 max-w-[1000px] items-center">
                  <div className="flex justify-end">
                    {data.avatar ? (
                      <Avatar image={data.avatar} />
                    ) : (
                      <Avatar image={"./noimage.webp"} />
                    )}
                  </div>
                  <div>
                    <h1 className="text-center">{data.name}</h1>
                    <div className="flex items-center gap-2 pb-4 pt-2 justify-center md:justify-start">
                      <AccountCircleIcon />
                      <p className="font-bold">
                        {data.venueManager ? "Venue manager" : "Customer"}
                      </p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <Link to={"/update-avatar"} className="btn">
                        Update avatar
                      </Link>
                      {venueManager && (
                        <Link to={"/create-venue"} className="btn">
                          Create venue
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Section>
              <Section>
                {!venueManager ? (
                  <div>
                    <h2 className="text-center pb-12">Upcoming bookings</h2>
                    <div className="gap-4 grid mx-auto justify-center lg:grid-cols-3 md:grid-cols-2 max-w-7xl">
                      {data.bookings
                        ?.filter((item) => item.dateFrom > currentDate)
                        .sort(
                          (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
                        )
                        .map((item) => (
                          <Card
                            image={item.venue.media[0]}
                            title={item.venue.name}
                            headline="Booking info"
                            meta={item.venue.meta}
                            guests={item.guests}
                            date={`${formatDate(item.dateFrom)} - ${formatDate(
                              item.dateTo
                            )}`}
                            key={item.id}
                            id={item.venue.id}
                          />
                        ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="max-w-7xl  mx-auto text-center sm:text-left">
                      <h3 className="pb-8">Bookings at my venues</h3>
                      {data.venues?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center pb-4 justify-center sm:justify-start"
                        >
                          <Link
                            to={`/venue/bookings/${item.id}`}
                            className="font-semibold"
                          >
                            {item.name}
                          </Link>
                          <ArrowForwardIosIcon />
                        </div>
                      ))}
                    </div>
                    {data.venues && (
                      <h2 className="text-center pb-12">My venues</h2>
                    )}
                    <div className="gap-4 grid mx-auto justify-center lg:grid-cols-3 md:grid-cols-2 max-w-7xl">
                      {data.venues?.map((item) => (
                        <Card
                          image={item.media[0]}
                          title={item.name}
                          meta={item.meta}
                          key={item.id}
                          id={item.id}
                          linkButtonText={"Update"}
                          linkButtonUrl={`/venue/update/${item.id}`}
                          buttonText={"Delete"}
                          onClick={() => {
                            document.getElementById("delete_modal").showModal();
                            handleVenueId(item.id);
                          }}
                        />
                      ))}
                    </div>
                    <DialogModal
                      title={"Delete venue"}
                      description={
                        "Are you sure you want to delete this venue?"
                      }
                      onClick={handleDelete}
                      successMessage={
                        deleteIsSuccess ? "Item deleted successfully." : ""
                      }
                      errorMessage={deleteIsError ? deleteErrorMessage : ""}
                    />
                  </div>
                )}
              </Section>
            </>
          )}
        </>
      ) : (
        <Section>
          <div className="mx-auto text-center py-20">
            <h1 className="mb-8">You are not logged in</h1>
            <p>
              <Link to={"/login"} className="underline">
                Login
              </Link>
              or
              <Link to={"/register"} className="underline">
                Register
              </Link>
            </p>
          </div>
        </Section>
      )}
    </>
  );
}
