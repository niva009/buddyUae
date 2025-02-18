import { Eye, X } from "lucide-react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import {
  basicRequest,
  newFormRequest,
  RESET_PASSWORD,
  SEND_OTP,
} from "../../../api";
import toast from "react-hot-toast";
import { useAuthScreenToggleStore } from "../../../lib/slice/authScreen";

// schema
const schema = Yup.object({
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

export default function ForgotPasswordScreen() {
  const {
    forgotPassword,
    setForgotPassword,
    otpVerified,
    setVerifyOtpOpen,
    setEmailToBeVerified,
    userEmailToBeVerified,
  } = useAuthScreenToggleStore((state) => ({
    forgotPassword: state.forgotPassword,
    setForgotPassword: state.setForgotPassword,
    setVerifyOtpOpen: state.setVerifyOtpOpen,
    otpVerified: state.otpVerified,
    setEmailToBeVerified: state.setEmailToBeVerified,
    userEmailToBeVerified: state.userEmailToBeVerified,
  }));
  const [loader, setLoader] = useState(false);
  const [passwordIsVisble, setPasswordIsVisble] = useState(false);
  const [confirmPasswordIsVisble, setConfirmPasswordIsVisble] = useState(false);

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
    submitForm(data);
  };
  const submitForm = async (data) => {
    const formData = new FormData();
    formData.append("new_password", data.password);
    formData.append("email", userEmailToBeVerified);
    try {
      const res = await newFormRequest.post(RESET_PASSWORD, formData);
      console.log(res);
      if (res?.status === 200) {
        setLoader(false);
        toast.success("Reset password successfull");
        closeModal();
      }
    } catch (error) {
      setError("password", {
        type: "manual",
        message: error?.response?.data?.data?.password?.[0],
      });
      setLoader(false);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Some error occurred please try again after sometime");
      }
    }
  };

  const handleVerifyMail = async () => {
    if (!userEmailToBeVerified) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoader(true);
    try {
      const res = await basicRequest.get(SEND_OTP, {
        params: {
          email: userEmailToBeVerified,
        },
      });
      if (res?.data?.success === true) {
        setLoader(false);
        toast.success(res?.data?.message);
        setVerifyOtpOpen(true);
      }
    } catch (error) {
      setLoader(false);
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  function closeModal() {
    setForgotPassword(false);
    reset();
  }
  return (
    <>
      {forgotPassword ? (
        <div className="relative z-[99]">
          <div className="fixed inset-0 bg-black/25" />
          <div className="fixed inset-0 w-full overflow-y-auto">
            <div className="flex min-h-full w-full items-center justify-center text-center">
              <div className="lg:w-full w-[92%] relative max-h-[630px] lg:min-h-[620px] grid lg:grid-cols-2 max-w-5xl items-center transform overflow-hidden rounded bg-white shadow-xl transition-all">
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

                {otpVerified ? (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col py-14 w-full px-5 lg:px-20 items-start"
                  >
                    <h5 className="font-semibold text-3xl">Reset Password</h5>
                    <p className="font-medium text-left text-grey mt-3 text-[0.94rem]">
                      Reset your password by setting up <br /> new password
                    </p>
                    <div className="flex gap-0.5 mt-10 w-full items-start text-grey flex-col group">
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
                    <div className="flex gap-0.5 w-full mt-7 items-start text-grey flex-col group">
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
                    <button className="flex font-medium bg-blue text-white w-full rounded-lg items-center justify-center h-12 mt-14">
                      {loader ? (
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                          Submitting
                        </div>
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col py-14 w-full px-5 lg:px-20 items-start">
                    <h5 className="font-semibold text-3xl">Forgot Password</h5>
                    <p className="font-medium text-left text-grey mt-4 text-[0.94rem]">
                      Enter your registered email address to receive OTP to
                      continue
                    </p>
                    <div className="flex text-[0.94rem] mt-7 w-full flex-col gap-7">
                      <div className="flex w-full gap-0.5 items-start text-grey flex-col group">
                        <label>Email address</label>
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
                    </div>
                    <button
                      onClick={handleVerifyMail}
                      className="flex font-medium bg-blue text-white w-full rounded-lg items-center justify-center h-12 mt-14"
                    >
                      {loader ? (
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                          Submitting
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
