'use client';

import { Edit2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import React, { useState } from "react";
import { CHANGE_PASSWORD, newFormRequest } from "../../components/api/index";
import toast from "react-hot-toast";

// Create a validation schema with Yup
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,32}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be between 8 and 32 characters long"
    ),
  newpassword: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,32}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be between 8 and 32 characters long"
    ),
  confirmpassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newpassword"), null], "Passwords must match"),
});
export default function Password({ user }) {
  const [profileEdit, setProfileEdit] = useState(false);
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("current_password", data?.password);
    formData.append("new_password", data?.newpassword);
    try {
      setLoader(true);
      const res = await newFormRequest.post(
        `${CHANGE_PASSWORD}/${user?.id}`,
        formData
      );
      if (res.status == 200) {
        setLoader(false);
        toast.success("Password updated successfully");
        setProfileEdit(false);
      }
    } catch (error) {
      setLoader(false);
      console.error(error);
      toast.error("Failed to update password");
    }
  };
  return (
    <div className="flex flex-col rounded-xl border border-black/15 overflow-hidden w-full">
      <div className="flex bg-[#F3F5F7] items-center text-black w-full justify-between px-7 h-14">
        <h5 className="font-bold">Change password</h5>
        <div
          onClick={() => {
            setProfileEdit(!profileEdit);
          }}
          className="flex bg-blue cursor-pointer text-white shadow h-9 px-3 rounded-md items-center gap-1"
        >
          <span className="font-semibold text-[0.9rem]">Edit</span>
          <Edit2 className="h-4" />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-4 lg:px-14 py-7"
      >
        <div className="flex flex-wrap text-[0.9rem] gap-4">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-black/70">Password</p>
            <input
              type="password"
              {...register("password")}
              placeholder="********"
              disabled={!profileEdit}
              className={`h-10 rounded w-96 ${
                profileEdit ? "border px-2 border-black/30" : ""
              } ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-black/70">New Password</p>
            <input
              type="password"
              {...register("newpassword")}
              placeholder="********"
              disabled={!profileEdit}
              className={`h-10 rounded w-96 ${
                profileEdit ? "border px-2 border-black/30" : ""
              } ${errors.newpassword ? "border-red-500" : ""}`}
            />
            {errors.newpassword && (
              <span className="text-red-500 text-xs">
                {errors.newpassword.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-black/70">Confirm New Password</p>
            <input
              type="password"
              {...register("confirmpassword")}
              placeholder="********"
              disabled={!profileEdit}
              className={`h-10 rounded w-96 ${
                profileEdit ? "border px-2 border-black/30" : ""
              } ${errors.confirmpassword ? "border-red-500" : ""}`}
            />
            {errors.confirmpassword && (
              <span className="text-red-500 text-xs">
                {errors.confirmpassword.message}
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
