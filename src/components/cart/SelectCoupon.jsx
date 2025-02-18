import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import { COUPON_LIST, newRequest } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { Search, Sparkles, X } from "lucide-react";
import { useState } from "react";
import Pagination from "../../lib/pagination";

export default function CustomerCouponSelectScreen({
  popupOpen,
  setPopupOpen,
  code,
  setCode,
  setSelectedCoupon,
}) {
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  // GET
  const { data: couponListing, isLoading } = useQuery({
    queryKey: ["couponListing", currentPage, keyword],
    queryFn: () =>
      newRequest
        .get(COUPON_LIST, {
          params: {
            page: currentPage,
            keyword: keyword,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });
  useEffect(() => {
    setTotalPages(couponListing?.last_page);
  }, [couponListing]);

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

  const copycode = (code) => {
    // Create a temporary textarea element
    const textarea = document.createElement("textarea");
    textarea.value = code;
    document.body.appendChild(textarea);
    // Select the text within the textarea
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text
    document.execCommand("copy");

    // Remove the textarea
    document.body.removeChild(textarea);

    // Show a toast message or any other notification to indicate successful copy
    toast.success("Coupon code copied to clipboard!");
    setCode(code);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  return (
    <>
      {popupOpen && (
        <div className="fixed inset-0 bg-black/20 z-50 w-full h-full flex items-center justify-center">
          <Popover className="relative">
            <>
              <Transition
                as={Fragment}
                show={popupOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="w-[95%] mx-auto lg:w-full lg:min-w-[36rem] max-w-xl transform">
                  <div className="px-9 py-7 w-full bg-white rounded relative shadow-lg">
                    <div className="flex items-center justify-between">
                      <h5 className="text-[#2c2c2c] text-xl text-center tracking-[0.2px] font-bold">
                        Coupons
                      </h5>
                    </div>
                    <div className="flex mt-5 border border-[#8B8B8B] w-full h-10 rounded-md overflow-hidden items-center px-2">
                      <Search className="h-4 text-[#8B8B8B]" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={keyword}
                        onChange={(e) => {
                          setKeyword(e.target.value);
                        }}
                        className="text-sm w-full px-2"
                      />
                    </div>
                    <div className="flex text-sm overflow-y-auto pr-2 overflow-y-min h-80 max-h-80 flex-col mt-7 group gap-4">
                      {couponListing?.data?.map((i) => (
                        <div
                          key={i?.id}
                          className="flex flex-col lg:flex-row items-center justify-between border gap-4 lg:gap-7 border-zinc-200 rounded px-5 h-fit py-3 lg:py-0 lg:h-24 lg:min-h-24"
                        >
                          <div className="flex items-center flex-col">
                            <div className="flex gap-5 items-center">
                              <img
                                className="h-8 object-contain"
                                src="/coupon.png"
                              />
                              <div className="flex flex-col">
                                <span className="font-semibold text-[0.9rem]">
                                  Get discount of {i?.discount}{" "}
                                  {i?.discount_type == "percent" ? "%" : ""}
                                </span>
                                <span className="hidden lg:block text-xs mt-1 font-medium text-red-500">
                                  * Coupon will expire on {i?.end_date}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              copycode(i?.code);
                              localStorage.removeItem("coupon");
                              setSelectedCoupon("");
                            }}
                            className={`text-[0.8rem] h-9 w-24 min-w-24 justify-center flex items-center gap-2 px-4 group-hover:text-yellow-100 text-white font-medium ${
                              code === i?.code ? "bg-yellow-600" : "bg-blue/70"
                            }`}
                          >
                            {code === i?.code ? (
                              <span className="flex items-center gap-1">
                                <Sparkles className="h-5" /> Copied
                              </span>
                            ) : (
                              <span>{i?.code}</span>
                            )}
                          </button>
                          <span className="lg:hidden text-xs mt-1 font-medium text-red-500">
                            * Coupon will expire on {i?.end_date}
                          </span>
                        </div>
                      ))}
                    </div>
                    {couponListing?.data?.length > 5 ? (
                      <div className="flex justify-end">
                        <Pagination
                          setCurrentPage={setCurrentPage}
                          currentPage={currentPage}
                          goToNextPage={goToNextPage}
                          goToPreviousPage={goToPreviousPage}
                          totalPages={totalPages}
                          pageNumbers={pageNumbers}
                        />
                      </div>
                    ) : null}

                    <div className="flex gap-4 mt-9">
                      <button
                        onClick={handleClose}
                        className="bg-black/20 w-40 rounded border bg-blue border-zinc-200 font-semibold flex items-center justify-center text-sm text-white h-10"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>
        </div>
      )}
    </>
  );
}
