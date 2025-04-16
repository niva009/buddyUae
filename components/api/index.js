import axios from "axios";

// Axios instances
const baseConfig = {
  baseURL: process.env.NEXT_API_URL || "https://admin.buddyuae.com/api",
};

export const basicRequest = axios.create(baseConfig);

export const basicXFormRequest = axios.create({
  ...baseConfig,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const XFormRequest = axios.create({
  ...baseConfig,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const newRequest = axios.create({
  ...baseConfig,
  headers: {
    "Content-Type": "application/json",
  },
});

newRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("secret_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const newFormRequest = axios.create({
  ...baseConfig,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

newFormRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("secret_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

XFormRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem("secret_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ALL THE API CALLS

// AUTH APIS

// REGISTER
export const REGISTER = "user_register";
// LOGIN
export const LOGIN = "login";
// GET PROFILE
export const GET_PROFILE = "user/user-details";
// SEND OTP
export const SEND_OTP = "send-otp";
// SIGN UP
export const SEND_OTP_SIGNUP = "verify-otp";
// VERIFY OTP
export const VERIFY_OTP = "validate-otp";

// PRODUCT APIS

// LATEST PRODUCT
export const LATEST_PRODUCT = "products/new-product-list";
// FEATURED PRODUCT
export const FEATURED_PRODUCT = "products/featured-product-list";
// CATEGORY PRODUCT
export const CATEGORY_PRODUCT = "category/category-product-list";
// PRODUCTS
export const PRODUCTS = "products/all-product-list";
// BRAND PRODUCTS
export const BRAND_PRODUCTS = "brands/brand-product-list";
// PRODUCT VIEW
export const PRODUCT_VIEW = "products/product-view";

// REVIEWS APIS

// ADD
export const ADD_REVIEW = "products/add-review";
// GET
export const GET_REVIEW = "/products/review-list";

// CART APIS

// ADD
export const ADD_CART = "products/add-cart";
// MUL ADD
export const MULTIPLE_ADD_CART = "products/add-multiple-cart";
// LIST
export const LIST_CART = "products/cart-list";
// QUANTITY
export const QUANTITY_CART = "products/update-product-quantity";
// CLEAR CART
export const CLEAR_CART = "products/cart-delete";
// REMOVE FROM CART
export const REMOVE_PRODUCT_FROM_CART = "products/productwise-cart-delete";

// CATEGORIES API

// FEATURED
export const FEATURED_CATEGORY = "category/featured-category-list";
// AS PER
export const ASPER_TYPE_CATEGORY = "category/filter-category";

// ADDRESS
// ADD
export const ADD_ADDRESS = "products/add-address";
// LISTING
export const ADDRESSES = "products/address-list";
// GET
export const GET_ADDRESS = "products/get-address";
// DEFAULT ADDRESS
export const DEFAULT_ADDRESS = "products/change-default-address";
// UPDATE ADDRESS
export const UPDATE_ADDRESS = "products/update-address";
// DELETE ADDRESS
export const DELETE_ADDRESS = "products/delete-address";

// PRICE LIST
export const PRICE_LIST = "products/price-list";
// CATEGORY LIST
export const CATEGORY_LIST = "category/all-categories";
// BRAND LIST
export const BRAND_LIST = "brands/brand-list";
// TOP BRAND LIST
export const TOP_BRAND_LIST = "brands/top-brand-list";

// COUPON LIST
export const COUPON_LIST = "coupon";
// CHECK COUPON
export const CHECK_COUPON = "coupon/check";
// TOP OFFER
export const TOP_OFFER = "coupon/promocode_detail";

// WISHLIST
// ADD
export const ADD_WISHLIST = "products/add-wishlist";
// REMOVE
export const REMOVE_WISHLIST = "products/remove-wishlist";
// LIST
export const LIST_WISHLIST = "products/wishlist";
// MULTIPLE
export const MULTIPLE_WISHLIST = "products/add-multiple-wishlist";

// PLACE ORDER
export const CONTINUE_PAYMENT = "products/place-order";
// CONFIRM ORDER
export const CONFIRM_ORDER = "products/confirm-order";

// ORDERS
export const ORDERS = "products/order-list";
export const ORDER_DETAILS = "products/order-details";
export const CONTINUE_PAYMENT_FIRST = "applicant/payment";

// CASH ON DELIVERY
export const CASH_ON_DELIVERY = "products/cash-delivery";

// SUBSCRIBE
export const SUBSCRIBE = "subscriber/add-subscriber";

// CONTACT
export const CONTACT = "contact";

// WEIGHT FORM
export const WEIGHT_FORM = "products/weight-form";

// UPDATE USER
export const UPDATE_USER = "user/user_update";

// CHANGE PASSWORD
export const CHANGE_PASSWORD = "user/change_password";

// RESET PASSWORD
export const RESET_PASSWORD = "user/reset_password";

// SEO
export const SEO = "seo/get";
