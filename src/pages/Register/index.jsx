import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/Form/Input";
import Toggle from "../../components/Form/Toggle";
import Section from "../../components/Section";
import usePostApi from "../../hooks/usePostApi";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    name: yup
      .string()
      .min(3)
      .matches(
        /^[\w]+$/,
        "Name must not contain punctuation symbols apart from underscore (_)"
      )
      .required("Name is required"),

    email: yup
      .string()
      .email("Email must be a valid email")
      .matches(
        /@(stud\.noroff\.no|noroff\.no)$/,
        "Email must be a valid stud.noroff.no or noroff.no email address"
      )
      .required("Email is required"),

    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),

    avatar: yup.string().url("Avatar must be a valid URL").notRequired(),

    venueManager: yup.boolean(),
  })
  .required();

export default function Register() {
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
    `${baseUrl}/auth/register`,
    postData
  );

  const onSubmit = (data) => {
    setPostData(data);
    reset();
  };

  return (
    <Section background={"#f5f5f5"}>
      <div className="max-w-[500px] mx-auto">
        <h1 className="mb-4">Register now</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
          <Input
            name="name"
            type="text"
            {...register("name")}
            label={"Name"}
            placeholder={"my_username"}
          />
          <p className="text-red-500 pt-2">{errors.name?.message}</p>
          <Input
            name="email"
            type="text"
            {...register("email")}
            label={"Email"}
            placeholder={"first.last@stud.noroff.no"}
          />
          <p className="text-red-500 pt-2">{errors.email?.message}</p>
          <Input
            name="password"
            type="password"
            {...register("password")}
            label={"Password"}
            placeholder={"Password"}
          />
          <p className="text-red-500 pt-2">{errors.password?.message}</p>
          <Input
            name="avatar"
            type="text"
            {...register("avatar")}
            label={"Avatar"}
            placeholder={"https://img.service.com/avatar.jpg"}
          />
          <p className="text-red-500 pt-2">{errors.avatar?.message}</p>
          <Toggle
            name="venueManager"
            label="Register as Venue Manager"
            {...register("venueManager")}
          />
          <button type="submit" className="btn bg-white text-[#161616]">
            Register
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
                text={"Your registration was successful. Welcome aboard!"}
                type={"success"}
              />
              <div className="text-center mt-4">
                <Link to={"/login"} className="underline font-bold ">
                  Login to your account
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
