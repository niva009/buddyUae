import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useState } from "react";
import { ADD_REVIEW, newFormRequest } from "../../../api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../../lib/slice/user";

// schema
const schema = Yup.object({
  rating: Yup.string(),
  comment: Yup.string().required("Comment is required"),
});

export default function WriteReviewScreen({ isOpen, setIsOpen, productId }) {
  const [loader, setLoader] = useState(false);
  const [rating, setRating] = useState(0);
  const queryClient = useQueryClient();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

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
    if (rating === 0) {
      setError("rating", {
        type: "manual",
        message: "Please add rating",
      });
      setLoader(false);
      return false;
    }
    formData.append("rating", rating);
    formData.append("comments", data.comment);
    formData.append("product_id", productId);
    formData.append("customer_id", user?.id);

    try {
      const res = await newFormRequest.post(ADD_REVIEW, formData);
      if (res?.data?.success === true) {
        queryClient.invalidateQueries(["reviews"]);
        setLoader(false);
        toast.success("Review added");
        closeModal();
      }
    } catch (error) {
      setError("rating", {
        type: "manual",
        message: error?.response?.data?.data?.rating?.[0],
      });
      setError("comment", {
        type: "manual",
        message: error?.response?.data?.data?.comment?.[0],
      });
      setLoader(false);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(
          error?.response?.data?.error ||
            "Some error occurred please try again after sometime"
        );
      }
    }
  };
  function closeModal() {
    setIsOpen(false);
    reset();
  }
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full relative max-h-[81vh] min-h-[80vh] grid grid-cols-3 max-w-4xl items-center transform overflow-hidden rounded bg-white shadow-xl transition-all">
                <X
                  onClick={closeModal}
                  className="absolute cursor-pointer top-7 text-grey right-7"
                />
                <img
                  className="h-full object-cover"
                  src="/review.png"
                  alt="review"
                />
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex col-span-2 flex-col p-14 items-start"
                >
                  <h5 className="font-bold text-3xl">Write a review</h5>
                  <p className="font-medium text-grey mt-4 text-[0.94rem]">
                    Share Your Experience
                  </p>
                  <div className="flex text-[0.94rem] mt-7 w-full flex-col gap-7">
                    <div className="flex w-full gap-1.5 items-start text-grey flex-col group">
                      <label>Select rating</label>
                      <div className="rating">
                        <input
                          type="radio"
                          name="rating-2"
                          value={1}
                          onChange={handleRatingChange}
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          value={2}
                          onChange={handleRatingChange}
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          value={3}
                          onChange={handleRatingChange}
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          value={4}
                          onChange={handleRatingChange}
                          className="mask mask-star-2 bg-orange-400"
                        />
                        <input
                          type="radio"
                          name="rating-2"
                          value={5}
                          onChange={handleRatingChange}
                          className="mask mask-star-2 bg-orange-400"
                        />
                      </div>
                      {errors.rating && (
                        <span className="text-xs font-medium text-red-500">
                          {errors.rating?.message}
                        </span>
                      )}
                    </div>
                    <div className="flex items-start gap-1.5 text-grey flex-col group">
                      <label>Comment</label>
                      <textarea
                        {...register("comment")}
                        className="w-full bg-transparent px-3 py-1.5 rounded-md border border-gray h-24 text-linkblack font-medium"
                      />
                      {errors.comment && (
                        <span className="text-xs text-left font-medium text-red-500">
                          {errors.comment?.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="flex text-[0.94rem] font-medium bg-blue text-white w-52 rounded-md items-center justify-center h-11 mt-10">
                    {loader ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                        Submiting review
                      </div>
                    ) : (
                      "Add Review"
                    )}
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
