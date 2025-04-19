import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { newFormRequest, WEIGHT_FORM } from "../../api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

// Define the Yup validation schema
const schema = yup.object().shape({
  contact_name: yup.string().required("Contact name is required"),
  contact_number: yup
    .string()
    .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
    .required("Contact number is required"),
  date_of_delivery: yup.string().required("Date of delivery is required"),
  available_timing: yup.string().required("Available timing is required"),
  lift_available: yup.string().required("Lift availability is required"),
  no_of_floors: yup.string(),
  pass_required: yup.string().required("Pass requirement is required"),
  remarks: yup.string(),
});

export default function WeightForm({ setWeightId, user }) {
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);
  const [liftAvailable, setLiftAvailable] = useState(true);
  consr[error,setclearErrors ] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!liftAvailable) {
      if (data.no_of_floors <= 0) {
        setError("no_of_floors", {
          type: "manual",
          message: "No of floors should be positive",
        });
        return false;
      } else {
        setclearErrors("no_of_floors");
      }
    }

    console.log(data);
    setLoader(true);
    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
    formData.append("customer_id", user?.id);
    try {
      const response = await newFormRequest.post(WEIGHT_FORM, formData);
      if (response.status === 200) {
        setWeightId(response?.data?.data?.id);
        queryClient.invalidateQueries(["cart"]);
        setLoader(false);
        reset();
        toast.success("Thanks for adding details");
      } else {
        setLoader(false);
        toast.error("Form submission failed!");
      }
    } catch (error) {
      setLoader(false);
      console.log("Error:", error);
      toast.error("An error occurred!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-5xl mx-auto px-5 md:pt-12 lg:pt-0 sm:pt-0 pt-10 lg:px-3 flex-col gap-4"
    >
      <div className="text-black uppercase font-extrabold text-2xl text-center lg:text-start">
        Delivery location details
      </div>
      <div className="grid w-full lg:grid-cols-2 gap-6">
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="contact_name"
            className="required font-semibold text-sm"
          >
            Contact name
          </label>
          <input
            type="text"
            {...register("contact_name")}
            className="h-11 px-2 border border-black/30 rounded-md w-full"
          />
          {errors.contact_name && (
            <p className="text-red-500 text-sm">
              {errors.contact_name.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="contact_number"
            className="required font-semibold text-sm"
          >
            Contact number
          </label>
          <input
            type="text"
            {...register("contact_number")}
            onKeyPress={(event) => {
              if (
                !/^[0-9]$/.test(event.key) ||
                event.target.value.length >= 10
              ) {
                event.preventDefault();
              }
            }}
            className="h-11 px-2 border border-black/30 rounded-md w-full"
          />
          {errors.contact_number && (
            <p className="text-red-500 text-sm">
              {errors.contact_number.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="date_of_delivery"
            className="required font-semibold text-sm"
          >
            Date of delivery
          </label>
          <input
            type="date"
            {...register("date_of_delivery")}
            className="h-11 px-2 border border-black/30 rounded-md w-full"
          />
          {errors.date_of_delivery && (
            <p className="text-red-500 text-sm">
              {errors.date_of_delivery.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="available_timing"
            className="required font-semibold text-sm"
          >
            Available timing
          </label>
          <input
            type="time"
            {...register("available_timing")}
            className="h-11 px-2 border border-black/30 rounded-md w-full"
          />
          {errors.available_timing && (
            <p className="text-red-500 text-sm">
              {errors.available_timing.message}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="remarks" className="font-semibold text-sm">
            Remarks (If anything about the site condition)
          </label>
          <textarea
            {...register("remarks")}
            className="h-24 px-2 border border-black/30 rounded-md w-full"
          ></textarea>
          {errors.remarks && (
            <p className="text-red-500 text-sm">{errors.remarks.message}</p>
          )}
        </div>
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="lift_available"
            className="required font-semibold text-sm"
          >
            Lift available (Yes/No)
          </label>
          <select
            {...register("lift_available")}
            onChange={(e) =>
              setLiftAvailable(e.target.value === "No" ? false : true)
            }
            className="h-11 select font-semibold px-5 select-sm border border-black/30 rounded-md w-full"
          >
            <option disabled value="">
              Select
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.lift_available && (
            <p className="text-red-500 text-sm">
              {errors.lift_available.message}
            </p>
          )}
        </div>
        {liftAvailable === false ? (
          <div className="flex w-full flex-col gap-1">
            <label
              htmlFor="no_of_floors"
              className="required font-semibold text-sm"
            >
              No of floors (If the lift is not available)
            </label>
            <input
              {...register("no_of_floors")}
              onKeyPress={(event) => {
                if (!/^[0-9]$/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              className="h-11 px-2 border border-black/30 rounded-md w-full"
            />
            {errors.no_of_floors && (
              <p className="text-red-500 text-sm">
                {errors.no_of_floors.message}
              </p>
            )}
          </div>
        ) : null}
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="pass_required"
            className="required font-semibold text-sm"
          >
            Pass required (Yes/No)
          </label>
          <select
            {...register("pass_required")}
            className="h-11 select font-semibold px-5 select-sm border border-black/30 rounded-md w-full"
          >
            <option disabled value="">
              Select
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.pass_required && (
            <p className="text-red-500 text-sm">
              {errors.pass_required.message}
            </p>
          )}
        </div>
        <div className="flex w-full"></div>
      </div>
      <p className="text-sm font-semibold">
        *Note : The delivery will be scheduled only according to the vehicle
        availability{" "}
      </p>
      <button
        disabled={loader}
        className="text-sm btn my-7 max-w-72 px-8 bg-blue text-white hover:bg-blue"
      >
        {loader ? (
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            Please wait ...
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
