'use client';

import { useQuery } from "@tanstack/react-query";
import { newRequest, LIST_CART } from "../components/api/index";
import { useUserStore } from "../lib/slice/user";

const useCartList = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const { data: cartList, isLoading } = useQuery({
    queryKey: ["cart", user],
    queryFn: () =>
      newRequest
        .get(LIST_CART, { params: { customer_id: user?.id } })
        .then((res) => res.data),
    enabled: !!user?.id,
    staleTime: 70000000000,
    cacheTime: 70000000000,
  });

  return { cartList, isLoading };
};

export default useCartList;
