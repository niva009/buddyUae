'use client'
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Mail } from "lucide-react";
import { newFormRequest, SUBSCRIBE } from "../../components/api/index";
import toast from "react-hot-toast";

// Define the validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function SubscriptionForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);
    try {
      const res = await newFormRequest.post(SUBSCRIBE, formData);
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        reset();
        setLoading(false);
      } else {
        toast.error(res?.data?.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 422) {
        toast.error("You have already subscribed with us");
      } else {
        toast.error("An error occurred while subscribing");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex pt-8 pb-2 border-b-2 bg-transparent border-slate-400 justify-between w-80"
      >
        <div className="flex gap-2 w-full items-center">
          <Mail className="stroke-2 h-5" />
          <input
            {...register("email")}
            autoComplete="new-password"
            name="user_email"
            className="w-full bg-[#F3F5F7]"
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="submit"
          className="hover:scale-[1.03] transition-all duration-500 font-semibold flex items-center gap-1.5 text-blue"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-blue"></div>
            </>
          ) : (
            "Signup"
          )}
        </button>
      </form>
      {errors?.email && (
        <p className="text-red-500 text-xs">{errors.email.message}</p>
      )}
    </div>
  );
}
