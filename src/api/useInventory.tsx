import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "./axios";

export const useInventory = (url = "") => {
  return useQuery({
    queryKey: ["items", url],
    queryFn: () => {
      return axios.get(url ? url : `items`);
    },
    staleTime: 15 * (60 * 1000),
  });
};

export const useInfiniteInventory = (url = "items?page=1") => {
  return useInfiniteQuery({
    queryKey: ["items", url],
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

export const useInventoryManage = () => {
  const queryClient = useQueryClient();

  const createInventory = (data: any) => {
    console.log(data);

    return axios.post("items", data);
  };

  const updateInventory = (data: any) => axios.put(`items/${data.id}`, data);

  const deleteInventoryItem = (data: any) =>
    axios.delete(`items/${data.id}`);

  const updateInventoryItems = (allItems: any[]) => {
    queryClient.setQueryData(["items", ""], (prevData: any) => {
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
  return {
    createInventory,
    updateInventory,
    updateInventoryItems,
    deleteInventoryItem,
  };
};
