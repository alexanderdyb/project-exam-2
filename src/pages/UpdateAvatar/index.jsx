import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../components/Form/Input";
import Section from "../../components/Section";
import Message from "../../components/Message";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store";
import usePutApi from "../../hooks/usePutApi";

const schema = yup
  .object({
    avatar: yup
      .string()
      .url("Avatar must be a valid URL")
      .required("Please enter a URL for your avatar"),
  })
  .required();

export default function UpdateAvatar() {
  const { userName, token } = useAuthStore();
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

  const { isLoading, isError, errorMessage, isSuccess } = usePutApi(
    `${baseUrl}/profiles/${userName}/media`,
    postData,
    token
  );

  const onSubmit = (data) => {
    setPostData(data);
    console.log("updatedData");
    console.log(data);

    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/profile");
    }
  }, [isSuccess, navigate]);

  return (
    <Section background={"#f5f5f5"}>
      <div className="max-w-[500px] mx-auto">
        <h1 className="mb-4">Update avatar</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
          <Input
            name="avatar"
            type="text"
            {...register("avatar")}
            label={"Avatar"}
            placeholder={"https://img.service.com/avatar.jpg"}
          />
          <p>{errors.avatar?.message}</p>
          <button type="submit" className="btn bg-white text-[#161616] mt-4">
            Update avatar
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
