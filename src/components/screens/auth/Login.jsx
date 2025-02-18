import { Eye, X } from "lucide-react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { LOGIN, newFormRequest } from "../../../api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthScreenToggleStore } from "../../../lib/slice/authScreen";
import { Link } from "react-router-dom";

// schema
const schema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginScreen() {
  const { loginOpen, setLoginOpen, setRegisterOpen, setForgotPassword } =
    useAuthScreenToggleStore((state) => ({
      loginOpen: state.loginOpen,
      setLoginOpen: state.setLoginOpen,
      setRegisterOpen: state.setRegisterOpen,
      setForgotPassword: state.setForgotPassword,
    }));
  const [loader, setLoader] = useState(false);
  const [passwordIsVisble, setPasswordIsVisble] = useState(false);
  const queryClient = useQueryClient();

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
    formData.append("email", data.email);
    formData.append("password", data.password);
    try {
      const res = await newFormRequest.post(LOGIN, formData);
      if (res?.data?.success === true) {
        localStorage.setItem("secret_token", res?.data?.data?.token);
        localStorage.setItem("user_id", res?.data?.data?.id);
        queryClient.invalidateQueries(["customerProfile"]);
        setLoader(false);
        toast.success("login successfull");
        closeModal();
        window.location.reload();
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
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Some error occurred please try again after sometime");
      }
    }
  };

  const handleVerifyMail = async () => {
    try {
      const res = await basicRequest.get(SEND_OTP, {
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
    }
  };
  function closeModal() {
    setLoginOpen(false);
    reset();
  }
  return (
    <>
      {loginOpen ? (
        <div className="relative z-[100]">
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

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col py-14 w-full px-5 lg:px-20 items-start"
                >
                  <h5 className="font-semibold text-3xl">Sign In</h5>
                  <p className="font-medium text-grey mt-4 text-[0.94rem]">
                    Don’t have an account yet?
                    <span
                      onClick={() => {
                        setRegisterOpen(true);
                        setLoginOpen(false);
                      }}
                      className="text-blue cursor-pointer font-semibold ml-1"
                    >
                      Create Account
                    </span>
                  </p>
                  <div className="flex text-[0.94rem] mt-7 w-full flex-col gap-7">
                    <div className="flex w-full gap-0.5 items-start text-grey flex-col group">
                      <label>Your username or email address</label>
                      <input
                        type="mail"
                        {...register("email")}
                        className="border-b bg-transparent w-full text-linkblack font-medium border-gray"
                      />
                      {errors.email && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.email?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex items-start gap-0.5 text-grey flex-col group">
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
                  </div>
                  <div className="flex text-[0.94rem] items-center w-full justify-between mt-7">
                    <div
                      onClick={() => {
                        setForgotPassword(true);
                        setLoginOpen(false);
                      }}
                      className="text-black underline underline-offset-2 cursor-pointer font-semibold"
                    >
                      Forgot password?
                    </div>
                  </div>
                  <button className="flex font-medium bg-blue text-white w-full rounded-lg items-center justify-center h-12 mt-10">
                    {loader ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                        Signing you in
                      </div>
                    ) : (
                      "Sign In"
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
