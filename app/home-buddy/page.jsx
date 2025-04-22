'use client'

import ShopClient from '../store/ShopClient';
import { Suspense } from 'react';

export default function OfficeProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopClient productType="home" />
    </Suspense>
  );
}
