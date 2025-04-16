import { useQuery } from "@tanstack/react-query";
import { newRequest, SEO } from "../components/api/index";
import { useUserStore } from "../lib/slice/user";

const useSeoData = () => {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const { data: seoData, isLoading } = useQuery({
    queryKey: ["seoData", user],
    queryFn: () =>
      newRequest
        .get(SEO, { params: { customer_id: user?.id } })
        .then((res) => res.data),
    enabled: !!user?.id,
    staleTime: 70000000,
    cacheTime: 70000000,
  });

  return { seoData, isLoading };
};

export default useSeoData;
