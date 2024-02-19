import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/Form/Input";
import Textarea from "../../components/Form/Textarea";
import Section from "../../components/Section";
import usePostApi from "../../hooks/usePostApi";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { useAuthStore } from "../../store";
import { Link } from "react-router-dom";
import Toggle from "../../components/Form/Toggle";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    media: yup.array().of(yup.string().url("Please enter a valid URL")),
    price: yup.number().required("Price is required"),
    maxGuests: yup.number().required("Max Guests is required"),
    rating: yup.number().default(0),
    meta: yup
      .object({
        wifi: yup.boolean().default(false),
        parking: yup.boolean().default(false),
        breakfast: yup.boolean().default(false),
        pets: yup.boolean().default(false),
      })
      .default(() => ({
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      })),
    location: yup
      .object({
        address: yup.string().default("Unknown"),
        city: yup.string().default("Unknown"),
        zip: yup.string().default("Unknown"),
        country: yup.string().default("Unknown"),
        continent: yup.string().default("Unknown"),
        lat: yup.number().default(0),
        lng: yup.number().default(0),
      })
      .default(() => ({
        address: "Unknown",
        city: "Unknown",
        zip: "Unknown",
        country: "Unknown",
        continent: "Unknown",
        lat: 0,
        lng: 0,
      })),
  })
  .required();

export default function CreateVenue() {
  const { isAuthenticated, token, venueManager } = useAuthStore();

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [postData, setPostData] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      media: [],
      price: undefined,
      maxGuests: undefined,
      rating: 0,
      meta: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
      location: {
        address: "Unknown",
        city: "Unknown",
        zip: "Unknown",
        country: "Unknown",
        continent: "Unknown",
        lat: 0,
        lng: 0,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const { isLoading, isError, errorMessage, isSuccess } = usePostApi(
    `${baseUrl}/venues`,
    postData,
    token
  );

  const onSubmit = (data) => {
    setPostData(data);
    reset();
  };

  return (
    <Section background={"#f5f5f5"}>
      {isAuthenticated && venueManager ? (
        <div className="max-w-[500px] mx-auto">
          <h1 className="mb-4">Create venue</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input name="name" label="Name *" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 pt-2">{errors.name.message}</p>
            )}
            <Textarea
              name="description"
              label="Description *"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 pt-2">{errors.description.message}</p>
            )}
            <h3>Media URLs</h3>
            {fields.map((item, index) => (
              <div key={item.id}>
                <Input
                  {...register(`media[${index}]`, {
                    required: "Media URL is required",
                  })}
                  type="url"
                  placeholder={`Media URL ${index + 1}`}
                />
                <button
                  type="button"
                  className="mt-2 font-bold"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className="btn" onClick={() => append("")}>
              Add Media URL
            </button>
            {errors.media && (
              <p className="text-red-500 pt-2">{errors.media.message}</p>
            )}
            <Input
              name="price"
              label="Price *"
              type="number"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-red-500 pt-2">{errors.price.message}</p>
            )}
            <Input
              name="maxGuests"
              label="Max Guests *"
              type="number"
              {...register("maxGuests")}
            />
            {errors.maxGuests && (
              <p className="text-red-500 pt-2">{errors.maxGuests.message}</p>
            )}
            <Input
              name="rating"
              label="Rating"
              type="number"
              {...register("rating")}
            />
            <fieldset>
              <legend>Meta</legend>
              <Toggle
                name="meta.wifi"
                label="WiFi"
                {...register("meta.wifi")}
              />
              <Toggle
                name="meta.parking"
                label="Parking"
                {...register("meta.parking")}
              />
              <Toggle
                name="meta.breakfast"
                label="Breakfast"
                {...register("meta.breakfast")}
              />
              <Toggle
                name="meta.pets"
                label="Pets"
                {...register("meta.pets")}
              />
            </fieldset>
            <fieldset>
              <legend>Location</legend>
              <Input
                name="location.address"
                label="Address"
                {...register("location.address")}
              />
              <Input
                name="location.city"
                label="City"
                {...register("location.city")}
              />
              <Input
                name="location.zip"
                label="ZIP"
                {...register("location.zip")}
              />
              <Input
                name="location.country"
                label="Country"
                {...register("location.country")}
              />
              <Input
                name="location.continent"
                label="Continent"
                {...register("location.continent")}
              />
              <Input
                name="location.lat"
                label="Latitude"
                type="number"
                {...register("location.lat")}
              />
              <Input
                name="location.lng"
                label="Longitude"
                type="number"
                {...register("location.lng")}
              />
            </fieldset>
            <button type="submit" className="btn">
              Submit
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
                <Message text={"Success! Venue created."} type={"success"} />
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto text-center">
          <h1>Login or register</h1>
          <p className="mt-6">
            <Link to={"/login"} className="underline">
              Login
            </Link>{" "}
            or{" "}
            <Link to={"/register"} className="underline">
              Register
            </Link>{" "}
            as Venue manager to create a venue
          </p>
        </div>
      )}
    </Section>
  );
}
