import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { CONTACT, newFormRequest } from "../../components/api/index";
import Link from "next/link";

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  message: yup.string().required("Message is required"),
});

export default function ContactForm() {
  const [loader, setLoader] = useState(false);
  const [accept, setAccept] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("message", data.message);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    try {
      const response = await newFormRequest.post(CONTACT, formData);
      console.log(response);
      if (response.status === 200) {
        setLoader(false);
        reset();
        toast.success("Message sent successfully!");
      } else {
        setLoader(false);
        toast.error("Form submission failed!");
      }
    } catch (error) {
      setLoader(false);
      console.error("Error:", error);
      toast.error("An error occurred!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-lg py-10 lg:px-7 bg-white flex-col gap-4"
    >
      <div className="text-2xl lg:text-3xl font-extrabold text-start">
        Talk to Buddy
      </div>
      <div className="grid w-full gap-4">
        <div className="flex gap-4">
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="first_name"
              className="required font-semibold text-sm"
            >
              First name
            </label>
            <input
              id="first_name"
              {...register("first_name")}
              className="h-12 px-2 border border-black/30 rounded-md w-full"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="last_name"
              className="required font-semibold text-sm"
            >
              Last name
            </label>
            <input
              id="last_name"
              {...register("last_name")}
              className="h-12 px-2 border border-black/30 rounded-md w-full"
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs">{errors.last_name.message}</p>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="mail" className="required font-semibold text-sm">
            Email
          </label>
          <input
            id="mail"
            type="email"
            {...register("email")}
            className="h-12 px-2 border border-black/30 rounded-md w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="phone" className="required font-semibold text-sm">
            Phone Number
          </label>
          <input
            id="phone"
            {...register("phone")}
            onKeyPress={(event) => {
              if (
                !/^[0-9]$/.test(event.key) ||
                event.target.value.length >= 10
              ) {
                event.preventDefault();
              }
            }}
            className="h-12 px-2 border border-black/30 rounded-md w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs">{errors.phone.message}</p>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-1">
        <label htmlFor="message" className="required font-semibold text-sm">
          Message
        </label>
        <textarea
          {...register("message")}
          className="h-24 py-1.5 px-2 border border-black/30 rounded-md w-full"
        ></textarea>
        {errors?.message && (
          <p className="text-red-500 text-xs">{errors.message.message}</p>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <input
          checked={accept}
          onChange={(e) => {
            setAccept(e.target.checked);
          }}
          type="checkbox"
          className="h-4 w-4"
        />
        <p className="font-medium">
          You agree to our friendly{" "}
          <Link
            href="/privacy-policy"
            className="underline underline-offset-2 cursor-pointer"
          >
            privacy policy
          </Link>
          .
        </p>
      </div>
      <button
        disabled={loader || !accept}
        className="text-sm btn rounded mt-7 border border-black/30 min-h-14 w-full capitalize px-8 bg-blue text-white hover:bg-blue"
      >
        {loader ? (
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            Sending message ...
          </div>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
