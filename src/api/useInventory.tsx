import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "./axios";

export const useAddons = (url = "") => {
  return useQuery({
    queryKey: ["addons", url],
    queryFn: () => {
      return axios.get(url ? url : `api/addons`);
    },
    staleTime: 15 * (60 * 1000),
  });
};

export const useInfiniteAddons = (url = "api/addons?page=1") => {
  return useInfiniteQuery({
    queryKey: ['addons', url],
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

export const useAddonManage = () => {
  const queryClient = useQueryClient();

  const createAddon = (data: any) => {
    console.log(data);

    return axios.post("api/addons", data);
  };

  const updateAddon = (data: any) => axios.put(`api/addons/${data.id}`, data);

  const updateAddons = (allAddons: any[]) => {
    queryClient.setQueryData(["addons", ""], (prevData: any) => {
      console.log(allAddons, prevData);
      if (prevData) {
        let newData = JSON.parse(JSON.stringify(prevData));
        newData.data.data = allAddons;
        console.log(newData, allAddons);
        return {...newData};
      }
      return prevData;
    });
  };
  return {createAddon, updateAddon, updateAddons};
};
