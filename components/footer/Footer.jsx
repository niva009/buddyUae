import Link from "next/link";
import { useRouter,usePathname } from "next/navigation";


export default function Footer() {
  const location = usePathname();
  const path = location.pathname;
  const navigate = useRouter();
  const handleHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };
  return (
    <div
      className={`flex flex-col ${path == "/orders" ? "bg-white" : "bg-light"}`}
    >
      <div className="lg:h-72 p-10 pt-14 2xl:container mx-auto gap-10 bg-black lg:gap-0 flex flex-col lg:flex-row justify-between px-4 sm:px-20 xl:px-48 w-full">
        <div className="flex items-center lg:items-start gap-3 flex-col">
          <div className="cursor-pointer" onClick={handleHome}>
            <img
              className="h-20 object-contain"
              src="/logo/footer.png"
              alt="buddy star"
            />
          </div>
          <div className="flex items-center lg:items-start font-semibold text-white">
            <div className="">Elevate Your Office,</div>
            <div className="px-0.5">Enhance Your Home. </div>
          </div>
          <div className="flex items-center mt-4 lg:mt-0 gap-5">
            <Link href="https://www.instagram.com/buddystaruae" target="_blank">
              <img src="/logo/instagram.png" alt="instagram" />
            </Link>

            <img src="/logo/facebook.png" alt="facebook" />
            <Link
              target="_blank"
              href="https://youtube.com/@buddyuae?si=kx7HmJQopC-YCURY"
            >
              <img src="/logo/youtube.png" alt="youtube" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/buddy-star-68654132a"
              target="_blank"
            >
              <img className="mt-[2px]" src="/logo/Linked.png" alt="linkedin" />
            </Link>
          </div>
        </div>
        <div className="lg:grid text-center lg:text-start grid-cols-3 gap-20">
          <div className="flex lg:pb-0 pb-8 text-[0.9rem] flex-col gap-2">
            <div
              type="button"
              onClick={handleHome}
              className="text-white cursor-pointer font-bold"
            >
              Home
            </div>
            <ul className="flex font-bold text-white flex-col gap-2">
              <Link href="/store">Shop</Link>
              <Link href="/contact">Contact Us</Link>
            </ul>
          </div>
          <div className="flex lg:pb-0 pb-8 text-[0.9rem] flex-col gap-2">
            <Link href="/faq" className="text-white font-bold">
              FAQ
            </Link>
            <ul className="flex font-bold gap-2 text-[0.9rem] text-white flex-col">
              <Link href="/shopping-policy">Shopping Policy</Link>
              <Link href="/cancellation-policy">Return & Refund</Link>
              <Link href="https://wa.me/+971547717887" target="_blank">
                Support
              </Link>
            </ul>
          </div>
          <div className="flex lg:pb-0 pb-8 text-[0.9rem] flex-col gap-2">
            <h5 className="text-white font-bold">Office</h5>
            <ul className="flex gap-1 text-white flex-col ">
              <li>Karama </li>
              <li>Dubai UAE</li>
              <a target="_blank" href="tel:+971 54 771 7887">
                +971 54 771 7887
              </a>
            </ul>
          </div>
        </div>
      </div>
      <div className="pt-4 2xl:container mx-auto gap-10 bg-black lg:gap-0 flex flex-col lg:flex-row justify-between px-4 sm:px-20 xl:px-48 w-full">
        <div className="lg:border-t lg:border-[#6C7275] flex items-center justify-between  flex-col lg:flex-row  pb-12 w-full">
          <div className="lg:flex flex py-4 lg:flex-row flex-col  gap-3 text-[.85rem]">
            <p className="text-white">
              Copyright © 2024 Buddy Star General Trading LLC. All rights
              reserved
            </p>
            <div className="flex gap-2 justify-center lg:justify-start">
              <p className="text-white/30 hidden lg:block">|</p>
              <Link href="/privacy-policy" className="text-white/30">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="text-white/30">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <img
              className="lg:h-8 h-6 object-cover"
              src="/footer/foot1.png"
              alt="apple pay"
            />
            <img
              className="lg:h-8 h-6 object-cover"
              src="/footer/foot2.png"
              alt="google pay"
            />
            <img
              className="lg:h-8 h-6 object-cover"
              src="/footer/foot3.png"
              alt="mastercard"
            />
            <img
              className="lg:h-8 h-6 object-cover"
              src="/footer/foot4.png"
              alt="paypal"
            />
            <img
              className="lg:h-8 h-6 object-cover"
              src="/footer/foot5.png"
              alt="visa"
            />
            <img
              className="lg:h-8 h-6 object-cover"
              src="/footer/foot6.png"
              alt="visa"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
