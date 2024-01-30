import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/Form/Input";
import Section from "../../components/Section";
import usePostApi from "../../hooks/usePostApi";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Email is required"),

    password: yup.string().required("Password is required"),
  })
  .required();

export default function Login() {
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

  const { isLoading, isError, errorMessage, isSuccess, data } = usePostApi(
    `${baseUrl}/auth/login`,
    postData
  );

  const onSubmit = (data) => {
    console.log(data);
    setPostData(data);
    reset();
  };

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("accessToken", data.accessToken);
    }
  }, [isSuccess, data]);

  return (
    <Section background={"#f5f5f5"}>
      <div className="max-w-[500px] mx-auto">
        <h1 className="mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
          <Input
            name="email"
            type="text"
            {...register("email")}
            label={"Email"}
            placeholder={"first.last@stud.noroff.no"}
          />
          <p>{errors.email?.message}</p>
          <Input
            name="password"
            type="password"
            {...register("password")}
            label={"Password"}
            placeholder={"Password"}
          />
          <p>{errors.password?.message}</p>
          <button type="submit" className="btn bg-white text-[#161616] mt-4">
            Login
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
