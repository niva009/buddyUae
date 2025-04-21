import Link from "next/link";
import RatingStars from "./Star";
import useCurrencyFormatter from "../../utils/useCurrency";
import slugify from "slugify";

const ProductCardHome = ({ product, discountedPrice }) => {
  const formatCurrencyAED = useCurrencyFormatter();

  const handleProductClick = () => {
    localStorage.setItem("selectedProductId", product?.id);
  };

  const productSlug = slugify(product?.name || "", { lower: true });

  console.log("product information", product);
  return (
    <Link
      href={`/product/${productSlug}`}
      key={product?.id}
      className="group relative"
    >
      <div className="h-72 relative p-4 h-84 lg:p-1 flex border border-black/20 items-center justify-center group-hover:shadow group-hover:scale-[1.02] transition-all duration-500 w-full bg-cover rounded-sm bg-no-repeat">
      <img
  className="h-full object-contain w-full"
  src={`${process.env.NEXT_PUBLIC_IMG_URL}${product?.thumbnail_img_link}`}
  alt={product?.name}
  onClick={handleProductClick}
/>

      </div>
      <div className="flex absolute bg-blue/50 text-white h-6 w-14 top-3 left-14 lg:left-3  font-bold rounded-sm text-sm items-center justify-center">
        New
      </div>
      {product?.discount > 0 ? (
        <div className="flex absolute bg-green-700 text-white h-6 w-14 top-10 left-14 lg:left-3 font-semibold rounded-sm text-sm items-center justify-center">
          - {product?.discount}%
        </div>
      ) : null}
      <div className="flex mt-2 lg:items-start items-center flex-col gap-1 py-4 lg:py-0">
        <div className="flex text-xl items-center">
          <RatingStars rating={product?.rating || 0} />
          <span className="ml-1 text-xs font-medium">
            <span className="text-blue">{product?.avgrating || 0}</span>
            /5
          </span>
        </div>
        <div className="flex font-semibold text-[.85rem] lg:text-left text-center">
          {product?.name}
        </div>
        <div className="flex items-center gap-2">
          {product?.unit_price != 0 ? (
            <div className="flex font-black text-base text-bold">
              <span className="rs font-semibold text-[.82rem]">AED &nbsp;</span>{" "}
              {formatCurrencyAED(product?.unit_price)}
            </div>
          ) : null}
          {/* {product?.discount != 0 ? (
            <>
              <div className="flex line-through font-black text-black/40 text-base text-bold">
                <span className="rs font-semibold text-[.82rem]">AED</span>{" "}
                {discountedPrice}
              </div>
            </>
          ) : null} */}
        </div>
      </div>
    </Link>
  );
};

export default ProductCardHome;
