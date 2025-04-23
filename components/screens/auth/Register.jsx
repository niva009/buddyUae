
'use Client';

import { Eye, Verified, X } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  REGISTER,
  SEND_OTP_SIGNUP,
  basicRequest,
  newFormRequest,
} from "../../../components/api/index";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthScreenToggleStore } from "../../../lib/slice/authScreen";

// schema
const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,32}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be between 8 and 32 characters long"
    ),
  confirmpassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function RegisterScreen() {
  const {
    registerOpen,
    setLoginOpen,
    otpVerified,
    setRegisterOpen,
    setEmailToBeVerified,
    setVerifyOtpOpen,
    userEmailToBeVerified,
  } = useAuthScreenToggleStore((state) => ({
    registerOpen: state.registerOpen,
    setLoginOpen: state.setLoginOpen,
    setRegisterOpen: state.setRegisterOpen,
    setVerifyOtpOpen: state.setVerifyOtpOpen,
    otpVerified: state.otpVerified,
    setEmailToBeVerified: state.setEmailToBeVerified,
    userEmailToBeVerified: state.userEmailToBeVerified,
  }));

  const [loader, setLoader] = useState(false);
  const [passwordIsVisble, setPasswordIsVisble] = useState(false);
  const [confirmPasswordIsVisble, setConfirmPasswordIsVisble] = useState(false);
  const queryClient = useQueryClient();

  const handleVerifyMail = async () => {
    if (!userEmailToBeVerified) {
      toast.error("Please enter a valid email");
      return;
    }
    try {
      const res = await basicRequest.get(SEND_OTP_SIGNUP, {
        params: {
          email: userEmailToBeVerified,
        },
      });
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        setVerifyOtpOpen(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    setLoader(true);
    saveForm(data);
  };
  const saveForm = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("c_password", data.confirmpassword);
    formData.append("user_type", "customer");
    try {
      const res = await newFormRequest.post(REGISTER, formData);
      if (res?.data?.success === true) {
        queryClient.invalidateQueries(["profile"]);
        setLoader(false);
        toast.success("Thank for registering with us");
        closeModal();
      }
    } catch (error) {
      setError("email", {
        type: "manual",
        message: error?.response?.data?.data?.email?.[0],
      });
      setError("password", {
        type: "manual",
        message: error?.response?.data?.data?.password?.[0],
      });
      setLoader(false);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Some error occurred please try again after sometime");
      }
    }
  };

  function closeModal() {
    setRegisterOpen(false);
    reset();
  }
  return (
    <>
      {registerOpen ? (
        <div className="relative z-[99]">
          <div className="fixed inset-0 bg-black/25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <div className="w-[92%] lg:w-full relative max-h-[630px] min-h-[620px] grid lg:grid-cols-2 max-w-5xl h-full items-center transform overflow-hidden rounded bg-white shadow-xl transition-all">
                <X
                  onClick={closeModal}
                  className="absolute cursor-pointer h-7 top-7 text-grey right-7"
                />
                <div className="hidden lg:flex h-full w-full p-3">
                  <img
                    src="/auth/login.png"
                    className="h-full object-cover rounded-md"
                    alt="auth"
                  />
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col -mb-14 py-14 h-full px-5 lg:px-20 items-start"
                >
                  <h5 className="font-bold text-3xl">Sign up</h5>
                  <p className="font-medium text-grey mt-4 text-[0.94rem]">
                    Already have an account?
                    <span
                      onClick={() => {
                        setLoginOpen(true);
                        setRegisterOpen(false);
                      }}
                      className="text-blue cursor-pointer font-semibold ml-1"
                    >
                      Sign In
                    </span>
                  </p>
                  <div className="flex text-[0.94rem] mt-7 w-full flex-col gap-4">
                    <div className="flex gap-0.5 w-full items-start text-grey flex-col group">
                      <label>Your Name</label>
                      <input
                        type="text"
                        {...register("name")}
                        className="border-b bg-transparent text-linkblack font-medium w-full border-gray"
                      />
                      {errors.name && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.name?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-0.5 w-full items-start text-grey flex-col group">
                      <div className="flex justify-between w-full">
                        <label>Email address</label>
                        {otpVerified ? (
                          <div className="flex items-center gap-0.5 text-blue font-semibold text-sm">
                            <Verified /> Verified
                          </div>
                        ) : (
                          <div
                            onClick={handleVerifyMail}
                            className="flex underline cursor-pointer text-blue font-semibold text-sm underline-offset-2"
                          >
                            Verify Otp
                          </div>
                        )}
                      </div>
                      <input
                        type="mail"
                        {...register("email")}
                        onChange={(e) => {
                          setEmailToBeVerified(e.target.value);
                        }}
                        className="border-b bg-transparent w-full text-linkblack font-medium border-gray"
                      />
                      {errors.email && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.email?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-0.5 items-start text-grey flex-col group">
                      <label>Password</label>
                      <div className="flex relative items-center border-b w-full border-gray">
                        <input
                          {...register("password")}
                          type={passwordIsVisble ? "text" : "password"}
                          className="w-full bg-transparent text-linkblack font-medium"
                        />
                        <Eye
                          onClick={() => setPasswordIsVisble(!passwordIsVisble)}
                          className={`cursor-pointer absolute -top-2 right-2 ${
                            passwordIsVisble ? "text-linkblack/70" : "text-gray"
                          }`}
                        />
                      </div>
                      {errors.password && (
                        <span className="text-xs text-left font-medium text-red-500">
                          {errors.password?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-0.5 items-start text-grey flex-col group">
                      <label>Confirm Password</label>
                      <div className="flex relative items-center border-b w-full border-gray">
                        <input
                          {...register("confirmpassword")}
                          type={passwordIsVisble ? "text" : "password"}
                          className="w-full bg-transparent text-linkblack font-medium"
                        />
                        <Eye
                          onClick={() =>
                            setConfirmPasswordIsVisble(!confirmPasswordIsVisble)
                          }
                          className={`cursor-pointer absolute -top-2 right-2 ${
                            confirmPasswordIsVisble
                              ? "text-linkblack/70"
                              : "text-gray"
                          }`}
                        />
                      </div>
                      {errors.confirmpassword && (
                        <span className="text-xs text-left font-medium text-red-500">
                          {errors.confirmpassword?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2  text-grey flex-row items-center group">
                      <input type="checkbox" className="w-4 size-4" />
                      <div>
                        I agree with{" "}
                        <span className="font-bold text-black">
                          Privacy Policy
                        </span>{" "}
                        and{" "}
                        <span className="font-bold text-black">
                          Terms of User
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={otpVerified === false}
                    className={`flex font-medium text-white w-full rounded-lg items-center justify-center h-12 mt-10 ${
                      otpVerified ? "bg-blue" : "bg-blue/50"
                    }`}
                  >
                    {loader ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                        Creating your account
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
