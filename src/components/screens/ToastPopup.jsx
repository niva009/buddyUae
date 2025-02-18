import toast from "react-hot-toast";

export default function ToastPopup({ message }) {
  return (
    <div className="transition !z-50 duration-150 ease-in-out absolute top-5 w-full sm:w-1/3">
      <div className="w-full bg-white rounded shadow-2xl">
        <div className="relative bg-black/10 rounded-t py-4 px-4 xl:px-8">
          <p className="text-base text-yipred font-bold leading-normal tracking-normal">
            Notification
          </p>
        </div>
        <div className="w-full h-full px-4 xl:px-8 pb-5">
          <div className="flex py-4 items-center">
            <div>
              <h3 className="mt-2 text-base text-red-500 font-semibold leading-4">
                {message}
              </h3>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss()}
            className="mt-2 focus:outline-none bg-red-500 rounded text-white px-5 h-10 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
