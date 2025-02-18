import { useQuery } from "@tanstack/react-query";
import { newRequest, LIST_WISHLIST } from "../api";
import { useUserStore } from "../lib/slice/user";

const useWishList = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ["wishlist", user],
    queryFn: () =>
      newRequest
        .get(LIST_WISHLIST, { params: { customer_id: user?.id } })
        .then((res) => res.data),
    enabled: !!user?.id,
    staleTime: 70000000000,
    cacheTime: 70000000000,
  });

  return { wishlist, isLoading };
};

export default useWishList;
