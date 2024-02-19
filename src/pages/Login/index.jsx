import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/Form/Input";
import Section from "../../components/Section";
import useAuth from "../../hooks/useAuth";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { isLoading, isError, errorMessage, isSuccess } = useAuth(
    `${baseUrl}/auth/login`,
    postData
  );

  const onSubmit = (data) => {
    setPostData(data);
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

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
          <p className="text-red-500 pt-2">{errors.email?.message}</p>
          <Input
            name="password"
            type="password"
            {...register("password")}
            label={"Password"}
            placeholder={"Password"}
          />
          <p className="text-red-500 pt-2">{errors.password?.message}</p>
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
        </div>
      </div>
    </Section>
  );
}
