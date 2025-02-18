import { useQuery } from "@tanstack/react-query";
import { Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../lib/slice/user";
import { Link } from "react-router-dom";
import { newRequest, ORDERS } from "../api";
import useCurrencyFormatter from "../utils/useCurrency";
import Pagination from "../components/pagination/Pagination";

export default function Orders() {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const formatCurrencyAED = useCurrencyFormatter();
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("all");
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", keyword, filter],
    queryFn: () =>
      newRequest
        .get(ORDERS, {
          params: { customer_id: user?.id, search: keyword, filter: filter },
        })
        .then((res) => res.data),
    enabled: !!user?.id,
  });

  useEffect(() => {
    setTotalPages(orders?.data?.last_page);
  }, [orders]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const generatePageNumbers = () => {
    const visiblePageCount = 7;
    const halfVisiblePages = Math.floor(visiblePageCount / 2);
    const startPage = Math.max(1, currentPage - halfVisiblePages);
    const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  const pageNumbers = generatePageNumbers();

  return (
    <>
      <div className="bg-[#F3F5F7] w-auto py-2 lg:py-4 px-5 items-center flex justify-between">
        <button
          onClick={() => setMenuVisible(true)}
          className="bg-blue rounded flex items-center justify-center gap-1 w-fit px-4 h-8 my-2 text-white lg:hidden"
        >
          <Filter className="h-5" /> Filter
        </button>
        <h5 className="lg:max-w-7xl px-5 sm:px-20 lg:px-48 text-xl font-bold">
          Your Orders
        </h5>
      </div>

      <div className="flex px-5 justify-center md:justify-start lg:max-w-6xl lg:mx-auto pt-5 w-full gap-72">
        <div className="hidden lg:flex gap-2 text-lg font-bold items-center">
          <img
            src="/logo/filter 05.png"
            className="object-contain h-5"
            alt=""
          />
          <p>Filter</p>
        </div>

        <div className="flex w-80 bg-[#f0f0f0] items-center px-3 rounded-full h-10">
          <img className="h-4" src="/product/search.png" alt="tag" />
          <input
            type="text"
            placeholder="Search orders..."
            onChange={(e) => setKeyword(e.target.value)}
            className="bg-transparent w-full flex-grow text-sm px-3"
          />
        </div>
      </div>

      <div className="pb-14 flex flex-col lg:grid lg:grid-cols-3 max-w-6xl mx-auto">
        <div className="flex w-full flex-col">
          {menuVisible && (
            <div
              className="fixed inset-0 bg-black/30 z-50"
              onClick={() => isMenuVisible(false)}
            ></div>
          )}
          <div
            className={`w-72 ${
              menuVisible ? "block" : "hidden"
            } fixed lg:relative top-0 left-0 h-full lg:z-auto z-50 bottom-0 lg:flex flex-col lg:h-fit pb-7 bg-white`}
          >
            <div className="flex justify-between font-bold text-xl gap-2 items-center px-5 py-3.5">
              <div className="flex lg:hidden gap-2 items-center">
                <img
                  src="/logo/filter 05.png"
                  className="object-contain h-5"
                  alt=""
                />
                <p>Filter</p>
              </div>
              <button
                onClick={() => setMenuVisible(false)}
                className="lg:hidden h-8 flex items-center justify-center bg-blue rounded-full w-8 text-center text-sm text-white font-normal"
              >
                X
              </button>
            </div>

            <div className="flex text-[.85rem] justify-between gap-3 flex-col px-5 font-semibold text-black/60">
              <p className="font-bold text-base text-black ">Order Status</p>
              <div className="flex justify-between">
                <p>All</p>
                <input
                  type="radio"
                  name="filter-order"
                  className="size-4"
                  checked={filter === "all"}
                  onChange={() => setFilter("all")}
                />
              </div>
              <div className="flex justify-between">
                <p>On the way</p>
                <input
                  type="radio"
                  name="filter-order"
                  value="ontheway"
                  className="size-4"
                  checked={filter === "ontheway"}
                  onChange={() => setFilter("ontheway")}
                />
              </div>
              <div className="flex justify-between">
                <p>Cancelled</p>
                <input
                  type="radio"
                  name="filter-order"
                  value="cancelled"
                  className="size-4"
                  checked={filter === "cancelled"}
                  onChange={() => setFilter("cancelled")}
                />
              </div>
              <div className="flex justify-between">
                <p>Refunded</p>
                <input
                  type="radio"
                  name="filter-order"
                  value="refund"
                  className="size-4"
                  checked={filter === "refund"}
                  onChange={() => setFilter("refund")}
                />
              </div>
              <div className="flex justify-between">
                <p>Delivered</p>
                <input
                  type="radio"
                  name="filter-order"
                  className="size-4"
                  value="delivered"
                  checked={filter === "delivered"}
                  onChange={() => setFilter("delivered")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex col-span-2 px-4 md:-ml-10 w-full mx-auto rounded lg:px-9 md:p-5 lg:p-7 flex-col">
          {isLoading ? (
            <div className="h-5 w-5 mx-auto my-14 animate-spin rounded-full border-b-2 border-blue"></div>
          ) : orders?.data?.length === 0 ? (
            <p>No orders found</p>
          ) : (
            <div className="flex flex-col">
              <div className="flex gap-0.5 mt-5 pt-5 md:pt-0 flex-col">
                {orders?.data?.data?.map((i) => (
                  <div key={i.combined_order_id}>
                    <div className="flex flex-col gap-3  md:flex-row md:gap-0 items-center justify-between">
                      <Link
                        to={`/order/${i.combined_order_id}`}
                        className="flex items-center gap-3"
                      >
                        <img
                          className="w-16 h-16 object-contain"
                          src="/order/0.png"
                          alt={i?.orderdetails?.[0]?.product?.name}
                        />
                        <div className="flex gap-1 flex-col">
                          <h5 className="text-lineblack capitalize w-44 lg:w-auto text-[.75rem] lg:text-[0.9rem] font-bold">
                            Order ID : {i?.combined_order_id}
                          </h5>
                          <div className="flex text-[0.8rem] text-grey gap-0.5 font-medium">
                            Total Amount{" "}
                            <span>
                              : AED {formatCurrencyAED(i?.grand_total)}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="flex flex-col lg:flex-row items-center gap-1.5">
                        <img
                          className="lg:w-10 w-8 cursor-pointer object-contain"
                          src="/product/on.png"
                          alt="delivered"
                        />
                        <div className="flex font-semibold text-sm text-center md:text-start flex-col">
                          <p className="lg:text-[0.9rem] text-[.75rem]">
                            {i?.delivery_status === "Pending"
                              ? "Delivery Pending"
                              : i?.delivery_status === "ontheway"
                              ? "On the way"
                              : i?.delivery_status === "shipped"
                              ? "Shipped"
                              : i?.delivery_status === "delivered"
                              ? "Delivered"
                              : i?.delivery_status === "cancelled"
                              ? "Cancelled"
                              : i?.delivery_status === "refund"
                              ? "Refund"
                              : ""}
                          </p>
                          <span className="text-grey w-40 text-center lg:text-start lg:text-xs text-[.65rem] font-medium">
                            Expected by{" "}
                            {i?.expect_date ?? "Yet to be confirmed"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full my-4 mx-auto h-[0.7px] bg-gray/70" />
                  </div>
                ))}
              </div>
              <Pagination
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                totalPages={totalPages}
                pageNumbers={pageNumbers}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
