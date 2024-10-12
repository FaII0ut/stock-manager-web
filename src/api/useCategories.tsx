import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "./axios";

export const useCategories = (url = "") => {
  return useQuery({
    queryKey: ["categories", url],
    queryFn: () => {
      return axios.get(url ? url : `categories`);
    },
    staleTime: 15 * (60 * 1000),
  });
};

export const useInfiniteCategories = (url = "categories?page=1") => {
  return useInfiniteQuery({
    queryKey: ["categories", url],
    initialPageParam: 0,
    queryFn: async ({pageParam, signal}) => {
      console.log("pageParam", pageParam);
      const res = await axios.get(pageParam != 0 ? pageParam : url, {signal});
      return res.data;
    },
    getPreviousPageParam: (firstPage: any) => {
      return firstPage?.links?.prev ?? undefined;
    },
    getNextPageParam: (lastPage: any) => {
      // console.log(lastPage?.links?.next)
      return lastPage?.links?.next ?? undefined;
    },
  });
};

export const useCategoriesManage = () => {
  const queryClient = useQueryClient();

  const createCategory = (data: any) => {
    console.log(data);

    return axios.post("categories", data);
  };

  const updateCategory = (data: any) => axios.put(`categories/${data.id}`, data);

  const updateCategoryItems = (allItems: any[]) => {
    queryClient.setQueryData(["categories", ""], (prevData: any) => {
      console.log(allItems, prevData);
      if (prevData) {
        let newData = JSON.parse(JSON.stringify(prevData));
        newData.data.data = allItems;
        console.log(newData, allItems);
        return {...newData};
      }
      return prevData;
    });
  };
  return {createCategory, updateCategory, updateCategoryItems};
};
