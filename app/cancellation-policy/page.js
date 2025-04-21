'use Client';
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function CancellationAndRefund() {
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
        <h1 className="text-xl my-4 font-bold">Refund Policy</h1>
        <p className="mb-4 text-sm text-[#8D8D8D]">
          Last Updated: September 14, 2024
        </p>
        <p className="mb-4 max-w-4xl text-sm text-black font-medium">
          Thank you for shopping with us. We want you to be completely satisfied
          with your purchase. If you are not satisfied with your order, please
          review our refund policy below
        </p>
        <h2 className="text-base font-bold mb-2">Eligibility for Refunds</h2>
        <p className="mb-4 text-sm text-[#8D8D8D]">
          We may collect information about you in a variety of ways. The
          information we may collect on the Platform includes:
        </p>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          Timeframe: To be eligible for a refund, you must request it within 7
          calendar days from the date of receipt of the product
        </li>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          Condition: Items must be returned in their original condition, unused,
          and with all original packaging and tags intact
        </li>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          Non-Refundable Items: Certain items are non-refundable, including but
          not limited to, perishable goods, personalized or custom-made
          products, and sealed items that have been opened.
        </li>
        <h2 className="text-base font-bold mb-2">How to Request a Refund</h2>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          Contact Us: Please contact our customer service team at
          sales@buddyuae.com or through our website’s contact form, providing
          your order number and the reason for the refund request.
        </li>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          Return Instructions: We will provide you with instructions on how to
          return the product. You must follow these instructions to ensure the
          return is processed efficiently.
        </li>
        <h2 className="text-base font-bold mb-2">Return Shipping</h2>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          Shipping Costs: Return shipping costs are the responsibility of the
          customer unless the return is due to a mistake on our part (e.g.,
          incorrect or defective items).
        </li>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          Shipping Method: We recommend using a trackable shipping service or
          purchasing shipping insurance to ensure the returned item is not lost
          in transit.
        </li>
        <h2 className="text-base font-bold mb-2">Refund Process</h2>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          Inspection: Once we receive the returned item, it will be inspected to
          confirm its condition and adherence to our refund policy.
        </li>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          Refund Timeframe: If approved, your refund will be processed within
          7-10 business days. The refund will be issued to the original payment
          method used at the time of purchase.
        </li>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          Partial Refunds: If the item is not returned in its original
          condition, a partial refund may be granted based on the extent of the
          damage or wear.
        </li>
        <h2 className="text-base font-bold mb-2">Exchanges</h2>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          Policy: We do not offer direct exchanges. If you wish to exchange a
          product, please return the original item for a refund and place a new
          order for the desired product.
        </li>
        <h2 className="text-base font-bold mb-2">
          Defective or Incorrect Items
        </h2>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          Report Issues: If you receive a defective or incorrect item, please
          contact us within 48 hours of receipt. We will arrange for the return
          of the defective or incorrect item and provide a replacement or full
          refund at no additional cost to you.
        </li>
        <h2 className="text-base font-bold mb-2">Contact Us</h2>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          For any questions or concerns regarding our refund policy, please
          reach out to our customer service team at sales@buddyuae.com or
          +971547717887. We are here to assist you and ensure a satisfactory
          resolution.
        </li>
        <h2 className="text-base font-bold mb-2">Changes to Policy</h2>
        <li className="mb-4 max-w-4xl text-sm text-[#8D8D8D]">
          We reserve the right to update or modify this refund policy at any
          time. Any changes will be posted on our website and will apply to all
          purchases made after the date of the update Thank you for shopping
          with us!
        </li>
      </div>
    </div>
  );
}
