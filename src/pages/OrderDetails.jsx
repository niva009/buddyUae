import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../lib/slice/user";
import { newRequest, ORDER_DETAILS } from "../api";
import { useParams } from "react-router-dom";
import useCurrencyFormatter from "../utils/useCurrency";

export default function OrderDetails() {
  const { id } = useParams();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const formatCurrencyAED = useCurrencyFormatter();

  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ["orders", id],
    queryFn: () =>
      newRequest
        .get(ORDER_DETAILS, {
          params: { customer_id: user?.id, order_id: id },
        })
        .then((res) => res.data),
    enabled: !!id,
  });

  return (
    <>
      <div className="bg-[#F3F5F7] w-auto py-2 lg:py-4 px-5 items-center flex justify-between">
        <h5 className="lg:max-w-7xl px-5 sm:px-20 lg:px-48 text-xl font-bold">
          Order Detail - #{id}
        </h5>
      </div>
      {isLoading ? (
        <div className="h-5 w-5 mx-auto my-28 animate-spin rounded-full border-b-2 border-blue"></div>
      ) : (
        <div className="md:pb-14 flex flex-col lg:grid lg:grid-cols-3 max-w-6xl mx-auto">
          <div className="flex col-span-2 w-full mx-auto rounded lg:px-9 p-5 lg:p-7 flex-col gap-7">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <p className="text-[0.8rem] font-medium text-black/70">
                  Delivery Address:
                </p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl capitalize font-bold">
                      {orderDetails?.data?.[0]?.addresses?.[0]?.name}
                    </h3>
                    <p className="text-blue/70 border-blue/70 border-2 rounded font-semibold text-xs h-6 flex items-center justify-center px-1.5">
                      {orderDetails?.data?.[0]?.addresses?.[0]?.address_type}
                    </p>
                  </div>
                  <p className="text-[0.94rem] text-black/70">
                    {orderDetails?.data?.[0]?.shipping_address}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Contact</span> -{" "}
                    <span className="font-medium text-black/70">
                      {orderDetails?.data?.[0]?.addresses?.[0]?.phone}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-1.5">
                <img
                  className="lg:w-10 w-8 cursor-pointer object-contain"
                  src="/product/on.png"
                  alt="delivered"
                />
                <div className="flex font-bold text-sm flex-col">
                  <p className="lg:text-[0.9rem] capitalize text-[.75rem]">
                    {orderDetails?.data?.[0]?.delivery_status === "Pending"
                      ? "Delivery Pending"
                      : orderDetails?.data?.[0]?.delivery_status === "ontheway"
                      ? "On the way"
                      : orderDetails?.data?.[0]?.delivery_status === "shipped"
                      ? "Shipped"
                      : orderDetails?.data?.[0]?.delivery_status === "delivered"
                      ? "Delivered"
                      : orderDetails?.data?.[0]?.delivery_status === "cancelled"
                      ? "Cancelled"
                      : orderDetails?.data?.[0]?.delivery_status === "refund"
                      ? "Refund"
                      : ""}
                  </p>
                  <span className="text-grey text-center lg:text-start lg:text-xs text-[.65rem] font-medium">
                    Expected by {orderDetails?.data?.[0]?.expect_date}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-5 flex-col">
              {orderDetails?.data?.[0].products?.map((i) => (
                <>
                  <div className="flex border border-black/15 rounded p-4 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex w-24 p-1 h-28 border border-black/15 rounded">
                        <img
                          className="w-full h-full object-contain"
                          src={i?.thumbnail_img_link}
                          alt={i?.name}
                        />
                      </div>
                      <div className="flex gap-1 flex-col">
                        <h5 className="text-lineblack capitalize w-44 lg:w-auto text-[.75rem] lg:text-[0.9rem] font-bold">
                          {i?.name}
                        </h5>
                        <div className="flex text-[.65rem] lg:text-[0.84rem] text-grey gap-0.5 font-medium">
                          Colour <span> : Green</span>
                        </div>
                        <div className="flex text-[.65rem] lg:text-[0.84rem] text-grey gap-0.5 font-medium">
                          Quantity <span> : {i?.quantity}</span>
                        </div>
                        <div className="flex font-extrabold text-[.65rem] lg:text-[0.84rem] text-black gap-0.5 mt-2">
                          Total
                          <span> : AED {formatCurrencyAED(i?.unit_price)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="flex w-full px-4 lg:px-0 pb-10 pt-5 md:pt-10 md:pb-0 md:py-10 flex-col">
            <div className="flex flex-col gap-4">
              <div className="border p-5 gap-2 flex flex-col border-black/30 rounded-lg">
                <div className="font-bold mt-2">Order summary</div>
                <div className="flex justify-between mt-2 gap-0.5 font-medium text-blue text-[.84rem]">
                  <span className="text-black">Subtotal</span>
                  <span className="font-semibold">
                    <span className="rs font-semibold text-black">
                      AED{" "}
                      {formatCurrencyAED(orderDetails?.data?.[0]?.sub_total)}
                    </span>{" "}
                  </span>
                </div>
                <div className="flex justify-between mt-2 gap-0.5 font-medium text-blue text-[.84rem]">
                  <span className="text-blue">Discount</span>
                  <span className="font-semibold">
                    <span className="rs font-semibold">
                      - AED{" "}
                      {formatCurrencyAED(
                        orderDetails?.data?.[0]?.discount_amount
                      )}
                    </span>{" "}
                  </span>
                </div>
                <div className="flex justify-between mt-2 gap-0.5 font-medium text-[#6C7275] text-[.84rem]">
                  <span className="text-[#6C7275]">Tax</span>
                  <span className="font-semibold">
                    <span className="rs font-semibold">
                      AED{" "}
                      {formatCurrencyAED(orderDetails?.data?.[0]?.tax_amount)}
                    </span>
                  </span>
                </div>
                <div className="flex w-full my-3 mx-auto h-[0.7px] bg-gray/70" />
                <div className="flex flex-col gap-5 pb-3">
                  <div className="flex justify-between mt-2 gap-0.5 text-[#6C7275] text-[.84rem]">
                    <span className="text-black font-bold">Total</span>
                    <span className="font-semibold">
                      <span className="rs text-black">
                        AED{" "}
                        {formatCurrencyAED(
                          orderDetails?.data?.[0]?.grand_total
                        )}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              {orderDetails?.data?.[0]?.weight_form_details ? (
                <div className="border p-5 gap-2 flex flex-col border-black/15 rounded-lg">
                  <div className="font-bold text-lg mt-2">
                    Delivery location details
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-0.5 justify-between mt-4 font-medium text-[#848484] text-[.84rem]">
                    <div className="flex flex-col gap-1">
                      <span className="text-black">Contact name</span>
                      <span>
                        {
                          orderDetails?.data?.[0]?.weight_form_details
                            ?.contact_name
                        }
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-black">Contact number</span>
                      <span>
                        {
                          orderDetails?.data?.[0]?.weight_form_details
                            ?.contact_number
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-0.5 justify-between mt-4 font-medium text-[#848484] text-[.84rem]">
                    <div className="flex flex-col gap-1">
                      <span className="text-black">Date of delivery</span>
                      <span>
                        {
                          orderDetails?.data?.[0]?.weight_form_details
                            ?.date_of_delivery
                        }
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-black">Available timing</span>
                      <span>
                        {
                          orderDetails?.data?.[0]?.weight_form_details
                            ?.available_timing
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-0.5 justify-between mt-4 font-medium text-[#848484] text-[.84rem]">
                    <div className="flex flex-col gap-1">
                      <span className="text-black">Lift available</span>
                      <span>
                        {
                          orderDetails?.data?.[0]?.weight_form_details
                            ?.lift_available
                        }
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-black">Pass required (Yes/No)</span>
                      <span>
                        {
                          orderDetails?.data?.[0]?.weight_form_details
                            ?.pass_required
                        }
                      </span>
                    </div>
                  </div>
                  {/* <div className="flex mt-4 text-[.84rem] text-[#848484] font-medium flex-col gap-1">
                    <span className="text-black">
                      Dealers delivery order to get signed (Yes/No)
                    </span>
                    <span>
                      {orderDetails?.data?.[0]?.weight_form_details
                        ?.dealer_delivery ?? "No"}
                    </span>
                  </div> */}
                  <div className="flex mt-4 text-[.84rem] text-[#848484] font-medium flex-col gap-1">
                    <span className="text-black">
                      Remarks (If anything about the site condition)
                    </span>
                    <span>
                      {orderDetails?.data?.[0]?.weight_form_details?.remarks}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
