import { Link } from "react-router-dom";
import RatingStars from "../product/Star";
import useCurrencyFormatter from "../../utils/useCurrency";

export default function SearchList({ products, setKeyword }) {
  const formatCurrencyAED = useCurrencyFormatter();
  return (
    <div className="dropdown-menu absolute top-14 overflow-y-min max-h-80 overflow-y-auto flex flex-col gap-2.5 px-2.5 shadow-lg border border-light py-4 rounded-lg h-80 bg-white z-[99] w-full">
      {products?.data?.data?.length > 0 ? (
        <>
          {products.data.data.map((i) => (
            <Link
              to={`/product/${i?.id}`}
              key={i?.id}
              onClick={() => setKeyword("")}
              className="flex font-semibold last:border-b-0 border-b px-3 border-b-gray pb-2 items-center gap-2.5"
            >
              <img
                className="h-16 border object-contain rounded-md border-gray w-16"
                src={i?.thumbnail_img_link}
                alt="product"
              />
              <div className="flex flex-col">
                <span>{i?.name}</span>
                <div className="flex font-black">
                  <span className="rs font-semibold mr-1">AED</span>{" "}
                  {formatCurrencyAED(i?.unit_price || 0)}
                </div>
                <div className="flex -mt-1 items-center text-base">
                  <RatingStars rating={i?.rating || 0} />
                </div>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <img
            className="h-36 object-contain"
            src="/notfound.png"
            alt="not found"
          />
        </div>
      )}
    </div>
  );
}
