'use Client';

import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function Faq() {
  return (
    <div className="flex relative items-start h-full gap-10 min-h-screen flex-col bg-zinc-100">
      <div className="px-10 py-7 mt-5 bg-white max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/" className="">
            <MoveLeft />
          </Link>
          <img
            className="h-14 object-contain"
            src="/logo/logofooter.png"
            alt="buddy star"
          />
        </div>{" "}
        <h1 className="text-xl my-4 font-bold">Frequently Asked Question</h1>
        <div className="flex mx-auto">
          <div role="tabpanel" className="py-5 flex flex-col gap-2">
            <div className="collapse rounded-md collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-base font-semibold text-lineblack">
                What products does Buddy UAE offer?
              </div>
              <div className="collapse-content -mt-1">
                <p className="text-grey">
                  Buddy UAE offers a wide range of high-quality products,
                  including electronics, fashion, home essentials, and outdoor
                  gear, all sourced from trusted suppliers worldwide.
                </p>
              </div>
            </div>
            <div className="collapse rounded-md collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-base font-semibold text-lineblack">
                How can I place an order on Buddy UAE?
              </div>
              <div className="collapse-content -mt-1">
                <p className="text-grey">
                  You can easily place an order by browsing our website,
                  selecting the products you want, adding them to your cart, and
                  proceeding to checkout where you can fill in your delivery and
                  payment details.
                </p>
              </div>
            </div>
            <div className="collapse rounded-md collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-base font-semibold text-lineblack">
                What are the available payment methods?
              </div>
              <div className="collapse-content -mt-1">
                <p className="text-grey">
                  We accept a variety of payment methods including credit/debit
                  cards, PayPal, and cash on delivery. All transactions are
                  secured for your peace of mind.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus rounded-md bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-base font-semibold text-lineblack">
                Does Buddy UAE offer international shipping?
              </div>
              <div className="collapse-content -mt-1">
                <p className="text-grey">
                  Yes, Buddy UAE ships internationally. Shipping times and costs
                  vary depending on the destination. For more information,
                  please check our shipping policy page.
                </p>
              </div>
            </div>
            <div className="collapse rounded-md collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-base font-semibold text-lineblack">
                How do I track my order?
              </div>
              <div className="collapse-content -mt-1">
                <p className="text-grey">
                  After placing an order, you will receive a confirmation email
                  with a tracking number. You can use this number to track your
                  order directly on our website or via the courier's website.
                </p>
              </div>
            </div>
            <div className="collapse rounded-md collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-base font-semibold text-lineblack">
                What is your return policy?
              </div>
              <div className="collapse-content -mt-1">
                <p className="text-grey">
                  Buddy UAE offers a 30-day return policy. If you are not
                  satisfied with your purchase, you can return the product in
                  its original condition for a refund or exchange. Please refer
                  to our return policy for more details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
