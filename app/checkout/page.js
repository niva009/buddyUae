'use client';

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useUserStore } from "../../lib/slice/user";
import useCartList from "../../utils/cartList";
import { redirect } from 'next/navigation'

import { useState, useEffect } from "react";
import useCurrencyFormatter from "../../utils/useCurrency";
const stripePromise = loadStripe(
  "pk_test_51PT7R1P8uwwvPPsCx5W5jcoeX1nFLd33F093vg8e4EX4qaZfeIdMv0LEAm0RxDqGjpOzefw2VfP5lXseuLuOSfHX00mWZ3AhKQ"
);

const paymentElementOptions = {
  layout: "accordion",
};


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setIsLoading] = useState(false);



  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: "http://localhost:7020/checkout/payment/success",
        // return_url: "https://buddystar.vercel.app/checkout/payment/success",
        return_url: "https://www.buddyuae.com/checkout/payment/success",
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  // GET CART
  const { cartList, isLoading } = useCartList();

  const formatCurrencyAED = useCurrencyFormatter();
  return (
    <>
      <div className="text-center w-full text-[1.3rem] font-semibold py-4">
        Let's Complete Checkout
      </div>
      {isLoading ? (
        <div className="h-5 w-5 mx-auto my-28 animate-spin rounded-full border-b-2 border-blue"></div>
      ) : (
        <div className="px-4 mt-7 mb-20 sm:px-10 xl:px-48 lg:grid lg:gap-14 flex flex-col lg:grid-cols-12">
          <div className="flex flex-col col-span-7">
            <div className="overflow-x-auto overflow-x-min">
              <table className="table">
                <thead>
                  <tr className="font-bold text-black text-[.9rem] border-b-1 border-[#6C7275]">
                    <th className="">Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartList?.cart_items?.map((i) => (
                    <tr className="" key={i?.id}>
                      <td>
                        <div className=" flex items-center gap-4">
                          <div className="avatar">
                            <div className="mask w-12 border border-black/20 rounded-md overflow-hidden lg:w-20 lg:h-24">
                              <img
                                className="h-full w-full object-contain"
                                src={i?.productImage}
                                alt={i?.name}
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="font-bold min-w-44 w-44 text-[.85rem]">
                              {i?.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-[.75rem] font-semibold">
                        <div className="px-4">{i?.quantity}</div>
                      </td>
                      <td className="text-[.75rem] font-semibold min-w-24 p-1">
                        AED {formatCurrencyAED(i?.unit_price)}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="text-[.8rem] font-bold min-w-28 p-1">
                      Subtotal :AED {formatCurrencyAED(cartList?.subtotal)}
                    </td>
                    <td className="text-[.8rem] font-bold min-w-28 p-1">
                      Tax : AED {formatCurrencyAED(cartList?.tax_amount)}
                    </td>
                    <td className="text-[.8rem] font-bold min-w-28 p-1">
                      Total : AED {formatCurrencyAED(cartList?.grand_total)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex h-fit md:h-96 col-span-5 flex-col">
            <form
              className="w-full  md:px-7 pt-12 md:py-0"
              onSubmit={handleSubmit}
            >
              <PaymentElement
                className="stripe-input mt-2"
                id="payment-element"
                options={paymentElementOptions}
              />
              <button
                className="bg-blue text-white rounded flex items-center justify-center text-sm font-medium h-12 w-full px-7 mt-10"
                disabled={loading || !stripe || !elements}
                id="submit"
              >
                <span id="button-text">
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                      Requesting
                    </div>
                  ) : (
                    `Pay now AED ${formatCurrencyAED(cartList?.grand_total)}`
                  )}
                </span>
              </button>
              {message && <div id="payment-message">{message}</div>}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const appearance = {
  theme: "stripe",
  rules: {
    ".Label": {
      marginBottom: "9px",
      color: "#0A0D13",
      fontWeight: 500,
      fontSize: "0.84rem",
      letterSpacing: "0.2px",
      textTransform: "capitalize",
    },
    ".Input": {
      boxShadow: "none",
      marginBottom: "4px",
      fontSize: "0.9rem",
    },
    ".Input::placeholder": {
      fontSize: "0.9rem",
    },
  },
};

const Checkout = () => {
  const { clientsecret } = useUserStore((state) => ({
    clientsecret: state.clientsecret,
  }));
  const options = {
    appearance,
    clientSecret: clientsecret,
  };
  console.log(clientsecret);
  return clientsecret ? (
    <div className="bg-white h-fit w-full gap-7">
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <div className="flex"></div>
    </div>
  ) : (
    redirect('/cart')

  );
};

export default Checkout;
