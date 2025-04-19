// app/store/page.tsx
import { Suspense } from "react";
import ShopClient from "./ShopClient";

export default function StorePage() {
  return (
    <Suspense fallback={<div>Loading store...</div>}>
      <ShopClient />
    </Suspense>
  );
}
