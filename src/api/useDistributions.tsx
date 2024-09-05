import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "./axios";

export const useDistribution = (url = "") => {
  return useQuery({
    queryKey: ["dispatches", url],
    queryFn: () => {
      return axios.get(url ? url : `dispatches`);
    },
    staleTime: 15 * (60 * 1000),
  });
};

export const useInfiniteDistribution = (url = "dispatches?page=1") => {
  return useInfiniteQuery({
    queryKey: ["dispatches", url],
    initialPageParam: 0,
    queryFn: async ({pageParam, signal}) => {
      console.log("pageParam", pageParam);
      const res = await axios.get(pageParam != 0 ? pageParam : url, {signal});
      return res.data;
    },
    getPreviousPageParam: (firstPage: any) => {
      return firstPage?.prev_page_url ?? undefined;
    },
    getNextPageParam: (lastPage: any) => {
      // console.log(lastPage?.links?.next)
      return lastPage?.next_page_url ?? undefined;
    },
  });
};

export const useDistributionManage = () => {
  const queryClient = useQueryClient();

  const createDistribution = (data: any) => {
    console.log(data);

    return axios.post("dispatches", data);
  };

  const updateDistribution = (data: any) => axios.put(`dispatches/${data.id}`, data);

  const updateDistributionItems = (allItems: any[]) => {
    queryClient.setQueryData(["dispatches", ""], (prevData: any) => {
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
  return {createDistribution, updateDistribution, updateDistributionItems};
};
