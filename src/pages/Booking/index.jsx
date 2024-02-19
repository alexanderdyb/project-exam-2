import { useParams } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/Form/Input";
import Section from "../../components/Section";
import usePostApi from "../../hooks/usePostApi";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { useAuthStore } from "../../store";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    dateFrom: yup.string().required("Date is required"),
    dateTo: yup.string().required("Date is required"),
    guests: yup.number().required("Guests is required"),
  })
  .required();

export default function Booking() {
  let { id } = useParams();
  const { isAuthenticated, token } = useAuthStore();

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [postData, setPostData] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { isLoading, isError, errorMessage, isSuccess } = usePostApi(
    `${baseUrl}/bookings`,
    postData,
    token
  );

  const onSubmit = (data) => {
    const dataWithVenueId = { ...data, venueId: id };
    setPostData(dataWithVenueId);
    reset();
  };

  return (
    <Section background={"#f5f5f5"}>
      {isAuthenticated ? (
        <div className="max-w-[500px] mx-auto">
          <h1 className="mb-4">Book now</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
            <Input
              name="dateFrom"
              type="date"
              {...register("dateFrom")}
              label={"From"}
            />
            <p>{errors.dateFrom?.message}</p>
            <Input
              name="dateTo"
              type="date"
              {...register("dateTo")}
              label={"To"}
            />
            <p>{errors.dateTo?.message}</p>
            <Input
              name="guests"
              type="number"
              {...register("guests")}
              label={"Guests"}
            />
            <p>{errors.guests?.message}</p>
            <button type="submit" className="btn bg-white text-[#161616] mt-6">
              Book
            </button>
          </form>
          <div className="mt-4">
            {isLoading && (
              <div>
                <Loading />
              </div>
            )}
            {isError && (
              <Message text={`Error: ${errorMessage}.`} type={"error"} />
            )}
            {isSuccess && (
              <>
                <Message
                  text={"Your booking was successful. Enjoy you're stay!"}
                  type={"success"}
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto text-center">
          <h1>Not logged in</h1>
          <p className="mt-6">
            <Link to={"/login"} className="underline">
              Login
            </Link>{" "}
            to book stay
          </p>
        </div>
      )}
    </Section>
  );
}
