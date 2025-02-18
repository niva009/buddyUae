import { create } from "zustand";

export const useAuthScreenToggleStore = create((set) => ({
  loginOpen: false,
  registerOpen: false,
  otpOpen: false,
  otpVerified: false,
  userEmailToBeVerified: "",
  forgotPassword: false,
  setLoginOpen: (value) => {
    set((state) => ({
      loginOpen: value,
    }));
  },
  setRegisterOpen: (value) => {
    set((state) => ({
      registerOpen: value,
    }));
  },
  setVerifyOtpOpen: (value) => {
    set((state) => ({
      otpOpen: value,
    }));
  },
  setOtpVerifed: (value) => {
    set((state) => ({
      otpVerified: value,
    }));
  },
  setEmailToBeVerified: (value) => {
    set((state) => ({
      userEmailToBeVerified: value,
    }));
  },
  setForgotPassword: (value) => {
    set((state) => ({
      forgotPassword: value,
    }));
  },
}));
