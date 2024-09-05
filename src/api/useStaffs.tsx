import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "./axios";

export const useStaffs = (url = "") => {
  return useQuery({
    queryKey: ["staff", url],
    queryFn: () => {
      return axios.get(url ? url : `staff`);
    },
    staleTime: 15 * (60 * 1000),
  });
};

export const useInfiniteStaffs = (url = "staff?page=1") => {
  return useInfiniteQuery({
    queryKey: ["staff", url],
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

export const useStaffsManage = () => {
  const queryClient = useQueryClient();

  const createStaffs = (data: any) => {
    console.log(data);

    return axios.post("staff", data);
  };

  const updateStaffs = (data: any) => axios.put(`staff/${data.id}`, data);

  const updateStaffsItems = (allItems: any[]) => {
    queryClient.setQueryData(["staff", ""], (prevData: any) => {
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
  return {createStaffs, updateStaffs, updateStaffsItems};
};
