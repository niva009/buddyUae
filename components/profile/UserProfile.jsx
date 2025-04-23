'use client';

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Edit2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { newFormRequest, UPDATE_USER } from "../../components/api/index";
import toast from "react-hot-toast";

// Create a validation schema with Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function UserProfile({ user }) {
  const [profileEdit, setProfileEdit] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [loader, setLoader] = useState(false);
  const [profileUrl, setProfileUrl] = useState("/img/default-av.png");
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (user?.name) {
      setValue("name", user?.name);
      setValue("email", user?.email);
    }
  }, [user, setValue]);

  useEffect(() => {
    if (user?.profile_picture) {
      setProfileUrl(user?.profile_picture);
    }
  }, [user, setProfileUrl]);

  const handleImage = (e) => {
    setProfileImage(e.target.files[0]);
    setProfileUrl(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmit = async (data) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("profile_picture", profileImage);
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    try {
      const res = await newFormRequest.post(
        `${UPDATE_USER}/${user?.id}`,
        formData
      );
      if (res.status == 200) {
        setLoader(false);
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries(["customerProfile"]);
        setProfileEdit(false);
      }
    } catch (error) {
      console.error(error);
      setLoader(false);
      toast.error("Failed to update profile");
    }
  };

  const handleImageError = (event) => {
    event.target.src = "/img/default-av.png";
  };

  return (
    <div className="flex flex-col overflow-hidden w-full">
      <div className="flex bg-blue items-center text-white w-full justify-between px-7 h-14 rounded-tr-xl rounded-tl-xl">
        <h5 className="font-semibold">Profile Information</h5>
        <div
          onClick={() => {
            setProfileEdit(!profileEdit);
          }}
          className="flex cursor-pointer items-center gap-1"
        >
          <span className="font-semibold text-[0.9rem]">Edit</span>
          <Edit2 className="h-4" />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border border-black/15 px-4 lg:px-14 rounded-br-xl rounded-bl-xl py-7"
      >
        <div className="flex items-center gap-2.5 font-semibold">
          <div className="flex group relative overflow-hidden border border-black/30 h-20 w-20 rounded-full">
            <label
              htmlFor="profile"
              className="absolute group-hover:flex hidden items-center justify-center w-full h-full bg-black/40"
            >
              <Edit2 className="h-5 text-white" />
              <input
                onChange={handleImage}
                id="profile"
                type="file"
                className="hidden"
              />
            </label>
            <img
              className="h-full w-full object-cover"
              src={profileUrl}
              alt={user?.name}
              onError={handleImageError}
            />
          </div>
          <p className="text-lg font-bold">{user?.name}</p>
        </div>
        <div className="flex mt-10 text-[0.9rem] flex-col">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-black/70">Name</p>
            <input
              type="text"
              disabled={!profileEdit}
              className={`h-10 rounded w-96 ${
                profileEdit ? "border px-2 border-black/30" : "font-semibold"
              } ${errors.name ? "border-red-500" : ""}`}
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex mt-5 flex-col gap-1">
            <p className="font-semibold text-black/70">Email</p>
            <input
              type="email"
              disabled={!profileEdit}
              className={`h-10 rounded w-96 ${
                profileEdit ? "border px-2 border-black/30" : "font-semibold"
              } ${errors.email ? "border-red-500" : ""}`}
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        {profileEdit ? (
          <button
            type="submit"
            className="flex mt-7 text-[0.9rem] bg-blue text-white font-semibold shadow h-9 w-fit px-5 rounded-md items-center gap-2"
          >
            {loader ? (
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                Updating
              </div>
            ) : (
              "Update"
            )}
          </button>
        ) : null}
      </form>
    </div>
  );
}
