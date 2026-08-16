import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { useQuery } from "@tanstack/react-query";

export type ReviewItem = {
  id: number;
  shopee_rating_id: string;
  username: string;
  user_avatar: string | null;
  rating_star: number;
  comment: string;
  images: string[] | string | null;
  createdAt: string;
};

export const getRandomReviews = async (limit = 12): Promise<ReviewItem[]> => {
  const response = await api.get<{ success: boolean; data: ReviewItem[] }>(
    `/review/random?limit=${limit}&isCommented=true`
  );
  return response.data.data;
};

type UseRandomReviewsOptions = {
  limit?: number;
  queryConfig?: QueryConfig<typeof getRandomReviews>;
};

export const useRandomReviews = ({
  limit = 12,
  queryConfig,
}: UseRandomReviewsOptions = {}) => {
  return useQuery({
    queryKey: ["reviews", "random", limit],
    queryFn: () => getRandomReviews(limit),
    staleTime: 10 * 60 * 1000,
    ...queryConfig,
  });
};
