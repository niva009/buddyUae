// app/store/page.tsx
import { Suspense } from "react";
import CategoryClient from "../../store/CategoryClient";


export default function StorePage() {

 
  return (
    <Suspense fallback={<div>Loading store...</div>}>
      <CategoryClient />
    </Suspense>
  );
}
