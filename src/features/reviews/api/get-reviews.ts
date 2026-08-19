import { api } from "@/lib/axios";
import { QueryConfig } from "@/lib/react-query";
import { Review, ReviewsResponse } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export type GetReviewsParams = {
  limit?: number;
  isCommented?: boolean;
};

export const getReviews = async (params: GetReviewsParams = { limit: 30, isCommented: true }): Promise<Review[]> => {
  const response = await api.get<ReviewsResponse>("/review/random", {
    params: {
      limit: params.limit ?? 30,
      isCommented: params.isCommented ?? true,
    },
  });

  if (!response.data?.success || !Array.isArray(response.data?.data)) {
    return [];
  }

  return response.data.data.map((r) => {
    let imgArr: string[] = [];
    if (Array.isArray(r.images)) {
      imgArr = r.images;
    } else if (typeof r.images === "string" && r.images.trim().startsWith("[")) {
      try {
        imgArr = JSON.parse(r.images);
      } catch {
        imgArr = [];
      }
    }

    return {
      id: r.id || r.shopee_rating_id || Math.random(),
      username: r.username || "Pembeli Shopee",
      user_avatar: r.user_avatar || null,
      rating_star: r.rating_star || 5,
      comment: (r.comment || "").replace(/Desain:|Kualitas:|Kualitas Bahan:/g, "").trim(),
      images: imgArr,
      createdAt: r.createdAt || "Ulasan Shopee",
      variant: "Custom Case Shockproof",
    };
  });
};

export const getReviewsQueryKey = (params?: GetReviewsParams) => ["reviews", params];

export const getReviewsQueryOptions = (params?: GetReviewsParams) => {
  return queryOptions({
    queryKey: getReviewsQueryKey(params),
    queryFn: () => getReviews(params),
    staleTime: 1000 * 60 * 5, // 5 mins cache
  });
};

type UseGetReviewsParams = {
  params?: GetReviewsParams;
  queryConfig?: QueryConfig<typeof getReviewsQueryOptions>;
};

export const useGetReviews = ({ params, queryConfig }: UseGetReviewsParams = {}) => {
  return useQuery({
    ...getReviewsQueryOptions(params),
    ...queryConfig,
  });
};
