import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function ShoppingPolicy() {
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
        <h1 className="text-xl my-4 font-bold">Shipping & Delivery</h1>
        <p className="mb-4 text-sm text-[#8D8D8D]">
          Last Updated: September 14, 2024
        </p>
        <p className="mb-4 text-sm text-[#8D8D8D]">
          Shipping and delivery are streamlined for your convenience. Upon
          placing your order, we will ensure delivery to any location within
          Dubai, Abu Dhabi and Northern Emirates according to the following
          schedule:
          <li className="mt-4">
            Dubai: Next business day delivery for orders placed by 3:30 PM.
            Please note that Saturday and Sundays are considered weekend days.
          </li>
          <li>
            Abu Dhabi: Delivery within 3 - 4 working days. Please note that
            Saturday and Sundays are considered weekend days.
          </li>
          <li>
            Northern Emirates: Delivery within 4 - 5 working days. Please note
            that Saturday and Sundays are considered weekend days.
          </li>
        </p>
        <p className="mb-4 text-sm text-[#8D8D8D]">
          We offer free delivery for orders exceeding AED 300 in Dubai and AED.
          2,000 in Abu Dhabi, AED. 3,000 in Northern Emirates. For orders below
          these thresholds and for shipments to other emirates within the UAE, a
          courier fee will apply. International shipments incur additional
          delivery and shipping fees and may be subject to customs duties and
          other taxes, depending on the destination countrys regulations.
          Delivery times for international orders may be longer due to shipping
          lead times, and items typically depart our warehouse within 72 hours.
          Please note that your order may be shipped in multiple packages, which
          could result in multiple charges appearing on your cardholders
          monthly statement. We do not ship to countries that are subject to
          OFAC (Office of Foreign Assets Control) sanctions or other
          international restrictions.
        </p>
      </div>
    </div>
  );
}
