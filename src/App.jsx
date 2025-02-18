import React from "react";
import { Toaster } from "react-hot-toast";
import AppRoute from "./routes/AppRoutes";
import QueryProvider from "./providers/QueryProvider";
import { HelmetProvider } from "react-helmet-async";
export default function App() {
  return (
    <>
      <Toaster
        style={{ zIndex: "999" }}
        toastOptions={{
          duration: 1000,
        }}
      />
      <QueryProvider>
        <HelmetProvider>
          <AppRoute />
        </HelmetProvider>
      </QueryProvider>
    </>
  );
}
