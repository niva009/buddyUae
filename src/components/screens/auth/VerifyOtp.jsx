import { useEffect, useState, useRef } from "react";
import {
  SEND_OTP,
  VERIFY_OTP,
  basicRequest,
  basicXFormRequest,
} from "../../../api";
import toast from "react-hot-toast";
import { useAuthScreenToggleStore } from "../../../lib/slice/authScreen";
import { X } from "lucide-react";

export default function VerifyOtpScreen() {
  const { otpOpen, setVerifyOtpOpen, setOtpVerifed, userEmailToBeVerified } =
    useAuthScreenToggleStore((state) => ({
      otpOpen: state.otpOpen,
      setVerifyOtpOpen: state.setVerifyOtpOpen,
      setOtpVerifed: state.setOtpVerifed,
      userEmailToBeVerified: state.userEmailToBeVerified,
    }));

  const [loader, setLoader] = useState(false);
  // Resend OTP
  const [waitingTime, setWaitingTime] = useState();
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  useEffect(() => {
    let waitingInterval;
    if (waitingTime > 0) {
      waitingInterval = setInterval(() => {
        setWaitingTime(waitingTime - 1);
      }, 1000);
    }

    return () => {
      if (waitingInterval) clearInterval(waitingInterval);
    };
  }, [waitingTime]);

  const resendOTP = async (e) => {
    e.preventDefault();
    setMinutes(3);
    setSeconds(30);
    try {
      const res = await basicRequest.get(SEND_OTP, {
        params: {
          email: userEmailToBeVerified,
        },
      });
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error occurred");
    }
  };

  const OTP_LENGTH = 4;
  const inputRefs = Array.from({ length: OTP_LENGTH }, () => useRef(null));
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));

  const focusNextInputField = (index) => {
    if (index < OTP_LENGTH - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const focusPrevInputField = (index) => {
    if (index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  let otpNumber = parseInt(otp.join(""));

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index]) {
      focusPrevInputField(index);
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      if (value && index < OTP_LENGTH - 1) {
        focusNextInputField(index);
      } else if (!value && index > 0) {
        focusPrevInputField(index);
      }
      setOtp(newOtp);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (/^\d{4}$/.test(pastedData)) {
      const pastedOtp = pastedData.split("");
      const newOtp = [...otp];
      for (let i = 0; i < OTP_LENGTH; i++) {
        if (pastedOtp[i]) {
          newOtp[i] = pastedOtp[i];
        }
      }
      setOtp(newOtp);
    }
  };

  const verifyOtp = async () => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("email", userEmailToBeVerified);
      formData.append("otp", otpNumber);
      const res = await basicXFormRequest.post(VERIFY_OTP, formData);
      console.log(res);
      if (res?.data?.success === true) {
        setLoader(false);
        setOtpVerifed(true);
        toast.success(res?.data?.message);
        setVerifyOtpOpen(false);
        // Clear the OTP fields after successful verification
        setOtp(new Array(OTP_LENGTH).fill(""));
      } else if (res.data.status == 400) {
        setLoader(false);
        setWaitingTime(3 * 60);
        toast.error("Invalid Otp");
      } else {
        setLoader(false);
        setWaitingTime(3 * 60);
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
      // Clear the OTP fields after successful verification
      setOtp(new Array(OTP_LENGTH).fill(""));
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      {otpOpen ? (
        <div className="relative z-[100]">
          <div className="fixed inset-0 bg-black/25" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <div className="w-[92%] lg:w-full relative max-h-[630px] min-h-[620px] grid lg:grid-cols-2 max-w-5xl h-full items-center transform overflow-hidden rounded bg-white shadow-xl transition-all">
                <X
                  onClick={() => {
                    setVerifyOtpOpen(false);
                  }}
                  className="absolute cursor-pointer h-7 top-7 text-grey right-7"
                />
                <div className="hidden lg:flex h-full w-full p-3">
                  <img
                    src="/auth/login.png"
                    className="h-full object-cover rounded-md"
                    alt="auth"
                  />
                </div>
                <div className="flex">
                  <div className="flex flex-col h-full px-5 lg:px-20 items-start">
                    <h5 className="font-bold text-3xl">Verify OTP</h5>
                    {waitingTime > 0 ? (
                      <span className="text-xs text-red-500">
                        Wait for three minutes to verify again
                      </span>
                    ) : null}
                    <div className="flex items-center text-[0.8rem] gap-1 mt-3 text-[#9F9F9F] font-medium">
                      {seconds > 0 || minutes > 0 ? (
                        <p>
                          Time Remaining:{" "}
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                      ) : (
                        <p>Didn’t receive code?</p>
                      )}

                      {seconds > 0 || minutes > 0 ? null : (
                        <button
                          onClick={resendOTP}
                          style={{
                            color: "#FF5630",
                          }}
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                    <div className="flex mt-11 w-full flex-col items-start gap-3">
                      <div className="text-[#9F9F9F] text-sm font-medium">
                        Enter OTP
                      </div>
                      <div className="flex mt-1 space-x-5">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={inputRefs[index]}
                            className="placeholder:text-bmwdarkgray text-center border rounded-lg border-zinc-300 h-14 w-14"
                            type="text"
                            maxLength="1"
                            value={digit}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handleOtpPaste}
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      disabled={
                        otp.every((digit) => digit === "") && waitingTime === 0
                      }
                      onClick={verifyOtp}
                      className="flex font-medium bg-blue text-white w-full rounded-lg items-center justify-center h-12 mt-10"
                    >
                      {loader ? (
                        <div className="flex items-center gap-2">
                          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                          Verifying OTP
                        </div>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
