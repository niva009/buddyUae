'use client';

import { useCallback } from "react";

const useCurrencyFormatter = () => {
  return useCallback((number) => {
    return new Intl.NumberFormat("ar-AE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  }, []);
};

export default useCurrencyFormatter;
