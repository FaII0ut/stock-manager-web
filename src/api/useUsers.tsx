import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "./axios";

export const useUsers = (url = "") => {
  return useQuery({
    queryKey: ["users", url],
    queryFn: () => {
      return axios.get(url ? url : `users`);
    },
    staleTime: 15 * (60 * 1000),
  });
};

export const useInfiniteUsers = (url = "users?page=1") => {
  return useInfiniteQuery({
    queryKey: ["users", url],
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

export const useUsersManage = () => {
  const queryClient = useQueryClient();

  const createUsers = (data: any) => {
    console.log(data);

    return axios.post("users", data);
  };

  const updateUsers = (data: any) => axios.put(`users/${data.id}`, data);

  const updateUsersItems = (allItems: any[]) => {
    queryClient.setQueryData(["users", ""], (prevData: any) => {
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
  return {createUsers, updateUsers, updateUsersItems};
};
