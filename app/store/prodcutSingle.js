'use client';

import  { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import Link from "next/link";
import RatingStars from "../../components/product/Star";
import QuantityButton from "../../components/product/QuantityButton";
import { ArrowRight, ChevronRight, Sparkles, View } from "lucide-react";
import { GET_REVIEW, PRODUCT_VIEW, newRequest } from "../../components/api/index";
import { useQuery } from "@tanstack/react-query";
import WriteReviewScreen from "../../components/screens/review/Write";
import Reviews from "../../components/product/Reviews";
import { useUserStore } from "../../lib/slice/user";
import NewArrivalProducts from "../../components/products/NewArrival";
import AddCartBtn from "../../components/product/AddCartBtn";
import ProductLargeViewScreen from "../../components/product/LargeView";
import WishlistProduct from "../../components/product/Wishlist";
import useCurrencyFormatter from "../../utils/useCurrency";
import ReactPlayer from "react-player";
import { useCartStore } from "../../lib/slice/cart";

export default function ProductSingle() {
    const params = useParams();
    console.log(params, "params from product page");
   const id = params.slug
  const [loader, setLoader] = useState(false);
  const [reviewScreenOpen, setReviewScreenOpen] = useState(false);
  const [largeViewScreenOpen, setLargeViewScreenOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const formatCurrencyAED = useCurrencyFormatter();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const { cartItems } = useCartStore((state) => ({
    cartItems: state.cartItems,
  }));


  useEffect(() => {
    const storedId = localStorage.getItem("selectedProductId");
    if (storedId) {
      setProductId(parseInt(storedId));
    }
  }, []);

  console.log("proudct id1", productId);

  // GET PRODUCTS
  const { data: productDetails, isLoading } = useQuery({
    queryKey: ["productDetails", productId],
    enabled: !!productId, // only runs if productId exists
    queryFn: () =>
      newRequest
        .get(PRODUCT_VIEW, {
          params: {
            product_id: productId,
          },
        })
        .then((res) => res.data),
  });

  console.log("product details informaation", productDetails);

  let colors = productDetails?.product?.colors;
  let maxQuantity = productDetails?.product?.quantity;

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState();
  let discount =
    (productDetails?.product?.unit_price * productDetails?.product?.discount) /
    100;
  let discountedPrice = productDetails?.product?.unit_price - discount;

  useEffect(() => {
    setActiveImage(productDetails?.product?.thumbnail_img_link);
  }, [productDetails, setActiveImage]);
  const [selectedTab, setSelectedTab] = useState(0);
  // Check if the product is already in the cart
  const isInCart = cartItems?.some((item) => item?.product_id == id);

  // GET REVIEWS
  const { data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () =>
      newRequest
        .get(GET_REVIEW, {
          params: {
            product_id: parseInt(id),
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  let message = `Enquiry on ${productDetails?.product?.name} https://buddy-uae.vercel.app/product/${id}`;
  const handleWhatsappShare = () => {
    const whatsappUrl = `https://wa.me/971547717887?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // calcute average rating for reviews
  const averageRating =
    reviews?.data?.data?.reduce((acc, rating) => {
      return acc + parseInt(rating.rating);
    }, 0) / reviews?.data?.data?.length || 0;
  console.log(
    productDetails?.product?.product_desc,
    "productDetails?.product?.product_descproductDetails?.product?.product_desc"
  );


  console.log("id from params",)
  return (
    <>

      <ProductLargeViewScreen
        isOpen={largeViewScreenOpen}
        setIsOpen={setLargeViewScreenOpen}
        activeImage={activeImage}
        setActiveImage={setActiveImage}
        productImages={productDetails?.product?.gallery_images}
      />
      <WriteReviewScreen
        isOpen={reviewScreenOpen}
        setIsOpen={setReviewScreenOpen}
        productId={productDetails?.product?.id}
      />
      <div className="text-sm px-4 sm:px-20 xl:px-48 breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/store">Shop</Link>
          </li>
          <li className="text-blue capitalize font-medium">
            {productDetails?.product?.name}
          </li>
        </ul>
      </div>
      {isLoading ? (
        <div className="h-5 w-5 mx-auto my-28 animate-spin rounded-full border-b-2 border-blue"></div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row px-4 md:pl-4 pl-8 md:px-4 lg:pl-0 sm:px-20 xl:px-48 gap-10 pt-10 pb-5">
            <div className="flex gap-3 flex-col items-center">
              <div
                onClick={() => {
                  setLargeViewScreenOpen(true);
                }}
                className="relative overflow-hidden lg:w-[25rem] 2xl:w-[32rem] border border-black/20 flex items-center justify-center h-96 w-full max-h-[520px] min-h-[470px] bg-no-repeat bg-cover"
              >
                <img
                  src={activeImage}
                  className="object-contain h-full w-full lg:px-0 px-4"
                  alt={productDetails?.product?.name}
                />
                <div className="absolute top-3 text-[.85rem] left-5 p-1 px-3 bg-blue text-white font-semibold rounded-lg">
                  New
                </div>
              </div>
              <div className="gallery-container items-center flex gap-3 flex-row overflow-hidden lg:w-[25rem] 2xl:w-[32rem] lg:p-2 overflow-x-auto horizontalScroll">
                {productDetails?.product?.gallery_images?.map((i) => (
                  <img
                    onClick={() => setActiveImage(i?.image_link)}
                    className={`h-36 w-32 object-contain rounded-sm cursor-pointer ${
                      i?.image_link == activeImage
                        ? "border border-blue"
                        : "border border-black/20"
                    }`}
                    src={i?.image_link}
                    key={i.image_link}
                    alt=""
                  />
                ))}
              </div>
              <div className="flex flex-col w-full gap-3 pt-5">
                <div className="grid justify-between grid-cols-3 gap-2">
                  <p className="text-slate-500/80 font-medium text-sm">SKU</p>
                  <p className="col-span-2 font-medium">
                    {productDetails?.product?.sku || "-"}
                  </p>
                </div>
                <div className="grid items-center grid-cols-3 gap-2">
                  <p className=" text-slate-500/80 font-medium text-sm">
                    CATEGORY
                  </p>
                  <p className="col-span-2 text-black text-sm font-semibold">
                    {productDetails?.product?.categories?.map((i) => (
                      <span key={i?.name}>{i?.name}</span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex w-full flex-col gap-1">
              <div className="flex my-1.5 text-2xl ">
                <RatingStars rating={averageRating} />
                <p className="pl-2 text-[.75rem] font-medium">
                  {reviews?.data?.data?.length || 0} Reviews
                </p>
              </div>
              <h5 className="text-lineblack text-2xl font-bold">
                {productDetails?.product?.name}
              </h5>
              <Link
                href={`/store/?brand=${productDetails?.product?.brand_id}`}
                className="text-[.78rem] underline underline-offset-4 font-medium text-[#6C7275]"
              >
                {productDetails?.product?.brands?.[0]?.name}
              </Link>
              <div className="flex gap-2 items-center text-lg">
                {productDetails?.product?.discount != 0 ? (
                  <div className="flex items-center pt-3 text-black gap-2 text-[1.4rem] font-semibold">
                    <div className="flex gap-1 font-semibold">
                      <span className="rs"> AED </span>
                      {formatCurrencyAED(discountedPrice)}
                    </div>
                    <span className="text-sm text-[#6c7275]">
                      (Exclusive of VAT)
                    </span>
                  </div>
                ) : (
                  <>
                    {productDetails?.product?.unit_price != 0 ? (
                      <div className="flex items-center pt-3 text-black gap-2 text-[1.4rem] font-semibold">
                        <div className="flex gap-1 font-semibold">
                          <span className="rs"> AED </span>
                          {formatCurrencyAED(
                            productDetails?.product?.unit_price
                          )}
                        </div>
                        <span className="text-sm text-[#6c7275]">
                          (Exclusive of VAT)
                        </span>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
              <p className="pt-3 items-center flex gap-1 font-medium text-[#6c7275]">
                <span className="font-semibold text-sm">
                  Product Description
                </span>{" "}
                <ChevronRight className="stroke-2 mt-[1px] h-5" />
              </p>
              <ul className="flex">
                <p
                  dangerouslySetInnerHTML={{
                    __html: productDetails?.product?.description,
                  }}
                  className="text-grey max-w-2xl md:pl-6 lg:pl-0 mt-2"
                ></p>
              </ul>
              <div className="flex w-full my-4 mx-auto h-[1px] bg-gray/70" />
              {colors?.length > 0 ? (
                <>
                  <h5 className="text-grey text-[.82rem] font-semibold">
                    Choose Color{" "}
                  </h5>
                  <div className="flex items-center gap-3 mt-2">
                    {colors?.map((i) => (
                      <Link
                        key={i?.product_id}
                        href={`/product/${i?.product_id}`}
                        style={{ background: i?.hex_code }}
                        className="w-8 border border-gray cusor-pointer h-8"
                      ></Link>
                    ))}
                  </div>
                  <div className="flex my-4 mx-auto h-[0.7px] bg-gray/70" />
                </>
              ) : null}
              {/* add to cart */}
              {productDetails?.product?.quantity > 0 ? (
                <div className="flex gap-4 w-full">
                  {isInCart ? (
                    <Link
                      href="/cart"
                      className="bg-black h-12 text-white font-semibold flex gap-2 items-center justify-center w-full lg:px-32 rounded-lg"
                    >
                      <Sparkles className="h-5" /> Go to cart
                    </Link>
                  ) : (
                    <>
                      <QuantityButton
                        quantity={quantity}
                        setQuantity={setQuantity}
                        productId={productDetails?.product?.id}
                        maxQuantity={maxQuantity}
                      />
                      <AddCartBtn
                        productDetails={productDetails}
                        loader={loader}
                        setLoader={setLoader}
                        quantity={quantity}
                        discountedPrice={discountedPrice}
                        type={"inner"}
                      />
                    </>
                  )}
                </div>
              ) : null}
              <div className="flex mt-1 gap-2 w-full flex-col lg:flex-row items-center">
                <WishlistProduct
                  type={"inner"}
                  productId={productDetails?.product?.id}
                  product={productDetails?.product}
                />
                {productDetails?.product?.quantity <= 0 ? (
                  <div className="flex gap-4 w-full">
                    <div
                      onClick={handleWhatsappShare}
                      className="bg-blue text-sm min-w-72 cursor-pointer h-12 capitalize text-white font-semibold flex gap-2 items-center justify-center w-full rounded-md"
                    >
                      Contact us for availability
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:pb-7 w-full text px-4 md:px-10 sm:px-20 xl:px-48 mx-auto">
            <div className="flex tabs w-full tabs-bordered">
            <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                checked={selectedTab === 0}
                onChange={() => setSelectedTab(0)} // ✅ use onChange instead of onClick
                className="tab text-sm lg:pb-0 md:pb-10 lg:text-base !w-44 font-semibold"
                aria-label="Specifications"
                />

                <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                checked={selectedTab === 1}
                onChange={() => setSelectedTab(1)} // ✅ use onChange instead of onClick
                className="tab text-sm lg:pb-0 md:pb-10 lg:text-base !w-44 font-semibold"
                aria-label="Specifications"
                />

{productDetails?.product?.video_link ? (
  <input
    type="radio"
    name="my_tabs_1"
    role="tab"
    checked={selectedTab === 3}
    onChange={() => setSelectedTab(3)} // ✅ FIXED here
    className="tab text-base !w-56 font-semibold"
    aria-label="Video"
  />
) : null}

            </div>
            <>
              {selectedTab == 0 && (
                <div role="tabpanel" className="w-full py-5 pl-7 md:pl-0">
                  <p
                    className="flex flex-col mt-2 gap-1  max-w-2xl md:pl-6 lg:pl-0 "
                    dangerouslySetInnerHTML={{
                      __html: productDetails?.product?.product_desc,
                    }}
                  >
                    {/* {productDetails?.product?.product_desc
                      ?.split("*")
                      .filter(
                        (item) => item.trim()
                      )
                      .map((item, index) => (
                        <p
                          key={index}
                          className=" ml-5 "
                          dangerouslySetInnerHTML={{ __html: item.trim() }}
                        ></p>
                      ))} */}
                  </p>
                  {productDetails?.product?.pdf_link && (
  <Link
    target="_blank"
    href={productDetails.product.pdf_link}
    className="pt-7 underline underline-offset-4 items-center flex gap-2 font-medium text-blue"
  >
    <span className="font-extrabold text-blue text-[0.94rem]">
      View Product Catalogue
    </span>
    <View className="h-5 w-5" />
  </Link>
)}

                </div>
              )}
              {selectedTab == 1 && (
                <div
                  role="tabpanel"
                  className="items-center flex flex-col justify-center w-full py-5"
                >
                  <div className="flex flex-wrap lg:flex-nowrap gap-y-3 items-center w-full justify-between">
                    <div className="flex gap-1 items-center">
                      <span className="font-semibold text-blue text-base">
                        All Reviews
                      </span>
                      ({reviews?.data?.data?.length || 0})
                    </div>
                    <div className="flex items-center gap-3">
                      {user?.name ? (
                        <div
                          onClick={() => setReviewScreenOpen(true)}
                          className="flex bg-blue cursor-pointer text-white rounded-full h-11 items-center justify-center px-5 font-medium text-sm"
                        >
                          Write a Review
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <Reviews data={reviews} />
                  {reviews?.data?.data?.length ? (
                    <div className="flex text-[0.94rem] text-blue font-semibold mt-7 items-center justify-center mx-auto w-fit px-7 h-12 rounded-full border border-gray">
                      Load More Reviews
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
              {selectedTab == 2 && (
                <div
                  role="tabpanel"
                  className="py-5 flex flex-col gap-2 lg:px-10"
                >
                  <div className="collapse rounded-md collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" defaultChecked />
                    <div className="collapse-title text-lg font-semibold text-lineblack">
                      What are challenger kayaks?
                    </div>
                    <div className="collapse-content -mt-1">
                      <p className="text-grey">
                        I have been using the Pentair Expedition 500 for several
                        months now, and it has exceeded all my expectations.
                        This kayak is built for adventure, with plenty of
                        storage space for all my gear and a comfortable seat.
                        I have been using the Pentair Expedition 500 for several
                        months now, and it has exceeded all my expectations.
                        This kayak is built for adventure, with plenty of
                        storage space for all my gear and a comfortable seat.
                      </p>
                    </div>
                  </div>
                  <div className="collapse rounded-md collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-lg font-semibold text-lineblack">
                      What are the main advantages of adventure kayaks?
                    </div>
                    <div className="collapse-content -mt-1">
                      <p className="text-grey">
                        I have been using the Pentair Expedition 500 for several
                        months now, and it has exceeded all my expectations.
                        This kayak is built for adventure, with plenty of
                        storage space for all my gear and a comfortable seat.
                        I have been using the Pentair Expedition 500 for several
                        months now, and it has exceeded all my expectations.
                        This kayak is built for adventure, with plenty of
                        storage space for all my gear and a comfortable seat.
                      </p>
                    </div>
                  </div>
                  <div className="collapse rounded-md collapse-plus bg-base-200">
                    <input type="radio" name="my-accordion-3" />
                    <div className="collapse-title text-lg font-semibold text-lineblack">
                      How to buy a good kayak?
                    </div>
                    <div className="collapse-content -mt-1">
                      <p className="text-grey">
                        I have been using the Pentair Expedition 500 for several
                        months now, and it has exceeded all my expectations.
                        This kayak is built for adventure, with plenty of
                        storage space for all my gear and a comfortable seat.
                        I have been using the Pentair Expedition 500 for several
                        months now, and it has exceeded all my expectations.
                        This kayak is built for adventure, with plenty of
                        storage space for all my gear and a comfortable seat.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-plus rounded-md bg-base-200">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-lg font-semibold text-lineblack">
                      What are some best brands for kayaks?
                    </div>
                    <div className="collapse-content -mt-1">
                      <p className="text-grey">
                        I have been using the Pentair Expedition 500 for several
                        months now, and it has exceeded all my expectations.
                        This kayak is built for adventure, with plenty of
                        storage space for all my gear and a comfortable seat.
                        I have been using the Pentair Expedition 500 for several
                        months now, and it has exceeded all my expectations.
                        This kayak is built for adventure, with plenty of
                        storage space for all my gear and a comfortable seat.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab == 3 && productDetails?.product?.video_link ? (
                <div role="tabpanel" className="w-full py-5">
                  <div className="h-72 lg:h-[515px] w-full max-w-full">
                    <ReactPlayer
                      url={productDetails?.product?.video_link}
                      width="100%"
                      height="100%"
                      playing
                      controls
                    />
                  </div>
                </div>
              ) : null}
            </>
          </div>
          <div className="items-center w-full justify-between pb-14 flex-col gap-2">
            <div className="grid lg:px-48 grid-cols-2">
              <div className="lg:text-2xl text-[1.2rem] px-3 lg:px-0 font-semibold">
                You might also like
              </div>
              <div className="flex flex-col text-[0.94rem] text-end justify-end font-semibold underline underline-offset-4">
                <Link href="/shop" className="flex justify-end gap-2" >
                  More Products <ArrowRight className="stroke-1 w-6" />{" "}
                </Link>
              </div>
            </div>
            <NewArrivalProducts />
          </div>
        </>
      )}
    </>
  );
}
