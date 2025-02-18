import { Link, useNavigate, useParams } from "react-router-dom";
import {
  newFormRequest,
  ADD_ADDRESS,
  GET_ADDRESS,
  newRequest,
  UPDATE_ADDRESS,
} from "../../api";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../lib/slice/user";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

// schema
const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  user_phone: Yup.string().required("Phone Number is required"),
  po_box: Yup.string().required("Po Box is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("Emirates is required"),
  flatNo: Yup.string().required("Flat number is required"),
  locality: Yup.string().required("Locality is required"),
  addressType: Yup.string().required("Address type is required"),
  land_mark: Yup.string().required("Landmark is required"),
});
export default function SaveAddress() {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const { id } = useParams();

  const { data: addressDetail } = useQuery({
    queryKey: ["addressDetail", user],
    queryFn: () =>
      newRequest
        .get(GET_ADDRESS, { params: { address_id: id, customer_id: user?.id } })
        .then((res) => res.data),
    enabled: !!id,
  });

  const navigate = useNavigate();
  const [defaultAddress, setDefaultAddress] = useState(false);
  const queryClient = useQueryClient();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (addressDetail?.data) {
      setValue("name", addressDetail?.data?.name);
      setValue("user_phone", addressDetail?.data?.phone);
      setValue("po_box", addressDetail?.data?.pincode);
      setValue("address", addressDetail?.data?.address);
      setValue("city", addressDetail?.data?.city);
      setValue("state", addressDetail?.data?.state);
      setValue("flatNo", addressDetail?.data?.flat_building);
      setValue("locality", addressDetail?.data?.locality);
      setValue("land_mark", addressDetail?.data?.land_mark);
      setValue("addressType", addressDetail?.data?.address_type);
    }
  }, [addressDetail, setValue]);

  useEffect(() => {
    if (addressDetail?.data && addressDetail?.data?.is_default_address === 1) {
      setDefaultAddress(true);
    } else {
      setDefaultAddress(false);
    }
  }, [addressDetail, setDefaultAddress]);

  const onSubmit = (data) => {
    setLoader(true);
    submitForm(data);
  };

  const submitForm = async (data) => {
    const formData = new FormData();
    formData.append("customer_id", user?.id);
    if (id) {
      formData.append("address_id", id);
    }
    formData.append("name", data?.name);
    formData.append("phone", data?.user_phone);
    formData.append("pincode", data?.po_box);
    formData.append("address", data?.address);
    formData.append("city", data?.city);
    formData.append("state", data?.state);
    formData.append("flat_building", data?.flatNo);
    formData.append("locality", data?.locality);
    formData.append("land_mark", data?.land_mark);
    formData.append("address_type", data?.addressType);
    formData.append("is_default_address", defaultAddress == true ? 1 : 0);
    try {
      const res = await newFormRequest.post(
        id ? UPDATE_ADDRESS : ADD_ADDRESS,
        formData
      );
      if (res?.status === 201) {
        queryClient.invalidateQueries(["address"]);
        setLoader(false);
        toast.success(res?.data?.message);
        navigate("/cart/choose-address");
        reset();
      }
    } catch (error) {
      setError("user_phone", {
        type: "manual",
        message: error?.response?.data?.errors?.phone?.[0],
      });
      setError("po_box", {
        type: "manual",
        message: error?.response?.data?.errors?.pincode?.[0],
      });
      setLoader(false);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Some error occurred please try again after sometime");
      }
    }
  };

  return (
    <>
      <div className="text-sm px-4 sm:px-20 xl:px-48 breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li className="text-blue capitalize font-medium">Address</li>
        </ul>
      </div>

      <div className="px-4 mt-7 mb-20 sm:px-20 xl:px-48 grid gap-10 lg:grid-cols-12">
        <div className="flex flex-col col-span-7">
          <h5 className="text-lineblack text-3xl text-black font-bold">
            Add Address
          </h5>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:grid flex flex-col  mt-7 gap-y-7 lg:grid-cols-2 gap-3 text-sm"
          >
            <div className="flex group w-full gap-0.5 items-start text-grey flex-col group">
              <label className="group-hover:text-blue required transition-all duration-500">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="border-b group-hover:border-b-blue transition-all duration-500 bg-transparent w-full text-linkblack font-medium border-gray"
              />
              {errors.name && (
                <span className="text-xs font-medium text-red-500">
                  {errors.name?.message}
                </span>
              )}
            </div>
            <div className="flex group w-full gap-0.5 items-start text-grey flex-col group">
              <label className="group-hover:text-blue required transition-all duration-500">
                Phone Number
              </label>
              <input
                {...register("user_phone")}
                autoComplete="new-password"
                onKeyPress={(event) => {
                  if (
                    !/^[0-9]$/.test(event.key) ||
                    event.target.value.length >= 10
                  ) {
                    event.preventDefault();
                  }
                }}
                className="border-b group-hover:border-b-blue transition-all duration-500 bg-transparent w-full text-linkblack font-medium border-gray"
              />
              {errors.user_phone && (
                <span className="text-xs font-medium text-red-500">
                  {errors.user_phone?.message}
                </span>
              )}
            </div>
            <div className="flex group w-full gap-0.5 items-start text-grey flex-col group">
              <label className="group-hover:text-blue required transition-all duration-500">
                PO Box
              </label>
              <input
                {...register("po_box")}
                autoComplete="new-password"
                onKeyPress={(event) => {
                  if (
                    !/^[0-9]$/.test(event.key) ||
                    event.target.value.length >= 5
                  ) {
                    event.preventDefault();
                  }
                }}
                className="border-b group-hover:border-b-blue transition-all duration-500 bg-transparent w-full text-linkblack font-medium border-gray"
              />
              {errors.po_box && (
                <span className="text-xs font-medium text-red-500">
                  {errors.po_box?.message}
                </span>
              )}
            </div>
            <div className="flex group w-full gap-0.5 items-start text-grey flex-col group">
              <label className="group-hover:text-blue required transition-all duration-500">
                Flat Number/ Building Name
              </label>
              <input
                type="text"
                {...register("flatNo")}
                autoComplete="new-password"
                className="border-b group-hover:border-b-blue transition-all duration-500 bg-transparent w-full text-linkblack font-medium border-gray"
              />
              {errors.flatNo && (
                <span className="text-xs font-medium text-red-500">
                  {errors.flatNo?.message}
                </span>
              )}
            </div>
            <div className="flex col-span-2 group w-full gap-0.5 items-start text-grey flex-col group">
              <label className="group-hover:text-blue required transition-all duration-500">
                Address
              </label>
              <input
                type="text"
                {...register("address")}
                className="border-b group-hover:border-b-blue transition-all duration-500 bg-transparent w-full text-linkblack font-medium border-gray"
              />
              {errors?.address && (
                <span className="text-xs font-medium text-red-500">
                  {errors.address?.message}
                </span>
              )}
            </div>
            <div className="flex group w-full gap-0.5 items-start text-grey flex-col group">
              <label className="group-hover:text-blue required transition-all duration-500">
                Locality
              </label>
              <input
                type="text"
                {...register("locality")}
                className="border-b group-hover:border-b-blue transition-all duration-500 bg-transparent w-full text-linkblack font-medium border-gray"
              />
              {errors.locality && (
                <span className="text-xs font-medium text-red-500">
                  {errors.locality?.message}
                </span>
              )}
            </div>
            <div className="flex group w-full gap-0.5 items-start text-grey flex-col group">
              <label className="group-hover:text-blue required transition-all duration-500">
                City
              </label>
              <input
                type="text"
                {...register("city")}
                className="border-b group-hover:border-b-blue transition-all duration-500 bg-transparent w-full text-linkblack font-medium border-gray"
              />
              {errors.city && (
                <span className="text-xs font-medium text-red-500">
                  {errors.city?.message}
                </span>
              )}
            </div>
            <div className="flex group w-full gap-0.5 items-start text-grey flex-col group">
              <label className="group-hover:text-blue required transition-all duration-500">
                Emirates
              </label>
              <input
                type="text"
                {...register("state")}
                autoComplete="new-password"
                className="border-b group-hover:border-b-blue transition-all duration-500 bg-transparent w-full text-linkblack font-medium border-gray"
              />
              {errors.state && (
                <span className="text-xs font-medium text-red-500">
                  {errors.state?.message}
                </span>
              )}
            </div>
            <div className="flex group w-full gap-0.5 items-start text-grey flex-col group">
              <label className="group-hover:text-blue required transition-all duration-500">
                Land Mark
              </label>
              <input
                type="text"
                {...register("land_mark")}
                className="border-b group-hover:border-b-blue transition-all duration-500 bg-transparent w-full text-linkblack font-medium border-gray"
              />
              {errors.land_mark && (
                <span className="text-xs font-medium text-red-500">
                  {errors.land_mark?.message}
                </span>
              )}
            </div>
            <div className="flex group w-full gap-0.5 items-start text-grey flex-col group">
              <label className="group-hover:text-blue required transition-all duration-500">
                Address type
              </label>
              <div className="flex mt-2 items-center gap-4 font-medium">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="Home"
                    {...register("addressType")}
                  />
                  <span className="-mt-[0.5px]">Home</span>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="Work"
                    {...register("addressType")}
                  />
                  <span className="-mt-[0.5px]">Work</span>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    value="Other"
                    {...register("addressType")}
                  />
                  <span className="-mt-[0.5px]">Other</span>
                </div>
              </div>
              {errors.addressType && (
                <span className="text-xs font-medium text-red-500">
                  {errors.addressType?.message}
                </span>
              )}
            </div>
            <div className="flex col-span-2 items-center gap-2">
              <input
                onClick={(e) => setDefaultAddress(e.target.checked)}
                className="h-4 w-4"
                type="checkbox"
              />
              <span className="mt-[1px]">Make this my default address</span>
            </div>
            <div className="col-span-2 mt-7 flex items-center gap-5">
              <button className="flex px-7 bg-blue items-center text-white justify-center h-10 rounded-lg gap-2 text-[0.9rem]">
                {loader ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                    Adding Address
                  </div>
                ) : (
                  "Add Address"
                )}
              </button>
              <Link
                to="/cart/checkout-details"
                className="flex items-center text-black justify-center h-10 rounded-full gap-2 text-[0.9rem]"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
