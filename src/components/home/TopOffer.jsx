import { useQuery } from "@tanstack/react-query";
import { newRequest, TOP_OFFER } from "../../api";
import toast from "react-hot-toast";

export default function TopOffer() {
  const handleCopyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(
      () => {
        toast.success("Coupon code copied to clipboard");
      },
      (err) => {}
    );
  };

  const { data: topOffer, isLoading } = useQuery({
    queryKey: ["topOffer"],
    queryFn: () =>
      newRequest.get(TOP_OFFER).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="lg:grid grid lg:grid-cols-2 w-full h-[22rem] lg:h-[30rem] ">
      <div
        className="bg-cover bg-center hidden lg:block"
        style={{ backgroundImage: 'url("/product/hurryup1.png ")' }}
      ></div>
      <div className="flex text-white flex-col md:pb-0 pb-10 relative md:items-center lg:items-start justify-center bg-black items-start bg-cover -ml-20 sm:-ml-0 bg-center">
        <img
          src="/store/home.png"
          className="absolute hidden lg:block object-contain md:w-36 lg:w-48 w-36 right-2 md:bottom-0 bottom-5 lg:bottom-10 md:right-10"
          alt=""
        />
        <div className="flex flex-col lg:text-start lg:justify-start lg:items-start md:text-center md:justify-center md:items-center pl-24 sm:pl-0  lg:mx-10 mx-3 lg:gap-3 gap-2">
          <div className="text-blue font-bold uppercase text-lg">
            Limited Time
          </div>
          <div className="lg:text-4xl md:text-3xl  text-2xl font-bold">
            {topOffer?.data?.title}
          </div>
          <div className="text-[.90rem] md:text-lg lg:text-[1rem] font-medium">
            {topOffer?.data?.sub_title}
          </div>
          <div className="font-medium my-2 md:text-lg text-[.90rem] lg:text-[1rem]">
            Use Promo Code :
          </div>
          <button
            onClick={() => handleCopyToClipboard(topOffer?.data?.code)}
            className="lg:h-12 border-white border-2 lg:w-44 h-8 w-32 font-semibold bg-blue  text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white"
          >
            {topOffer?.data?.code}
          </button>
        </div>
      </div>
    </div>
  );
}
