import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserLayout } from "../layout/User";

// pages
import Home from "../pages/Home";
import ScrollBack from "../components/ScrollTo";
import About from "../pages/About";
import Cart from "../pages/cart/Cart";
import Product from "../pages/Product";
import Orders from "../pages/Orders";
import Shop from "../pages/store/Shop";
import NewArrivals from "../pages/store/NewArrival";
import ChooseAddress from "../pages/address/Choose";
import SaveAddress from "../pages/address/Save";
import OrderComplete from "../pages/cart/OrderComplete";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/cart/Checkout";
import ContactUs from "../pages/ContactUs";
import Profile from "../pages/Profile";
import OrderDetails from "../pages/OrderDetails";
import TermsAndConditions from "../pages/TermsAndConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import CancellationAndRefund from "../pages/Cancellation";
import ShoppingPolicy from "../pages/ShoppingPolicy";
import Faq from "../pages/Faq";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <ScrollBack />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/store" element={<Shop />} />
          <Route path="/:param" element={<NewArrivals />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart/checkout-details" element={<ChooseAddress />} />
          <Route path="/checkout/payment/success" element={<OrderComplete />} />
          <Route path="/cart/choose-address" element={<ChooseAddress />} />
          <Route path="/cart/save-address/:id?" element={<SaveAddress />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="*" element={<Home />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route
            path="/cancellation-policy"
            element={<CancellationAndRefund />}
          />
          <Route path="/faq" element={<Faq />} />
          <Route path="/shopping-policy" element={<ShoppingPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
