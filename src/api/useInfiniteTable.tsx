import { useEffect, useMemo, useState } from "react";

interface useInfiniteTableProps {
  data: any;
  isFetchingNextPage: any;
  fetchNextPage: any;
  setCurrentUrl: any;
  hasNextPage: any;
  initialUrl: any;
}

const useInfiniteTable = ({
  data,
  isFetchingNextPage,
  fetchNextPage,
  setCurrentUrl,
  hasNextPage,
  initialUrl,
}: useInfiniteTableProps) => {
  const [tableData, setTableData] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [filterParam, setFilterParam] = useState<any>("");
  // console.log("useInfiniteTable", hasNextPage, !isFetchingNextPage);
  const [showScan, setShowScan] = useState(false);

  useEffect(() => {
    if (!data || !data.pages) {
      return;
    }
    // console.log("data", data, data.pages.map((item: any) => item.data).flat());
    setTableData(data.pages.map((item: any) => item.data).flat());
  }, [data]);

  useEffect(() => {
    setCurrentUrl(`${initialUrl}?page=1&search=${search}${filterParam}`);
  }, [search]);

  useEffect(() => {
    // setFilter(`${initialUrl}?page=1&search=${filter}`);

    setCurrentUrl(`${initialUrl}?page=1&search=${search}${filterParam}`);
  }, [filterParam]);
  //
  //apostles.eduspark.world/api/website/courses?categories[]=ai-in-education&categories[]=spark-courses&categories[]=wellbeing&categories[]=metacognition

  const handleFilter = (filter: any) => {
    let url = "";
    Object.keys(filter).map((key: string) => {
      url = url + `&filter[${key}]=${filter[key].join(",")}`;
      // filter[key].map((value: string, index: any) => {
      //   url = url + `&filter[${key}]=${value}`;
      // });
    });
    setFilterParam(url);
  };

  https: useEffect(() => {
    hasNextPage && onPaginate();
  }, [hasNextPage]);

  const onPaginate = () => {
    console.log("useInfiniteTable", hasNextPage, !isFetchingNextPage);
    !isFetchingNextPage && hasNextPage && fetchNextPage();
  };

  const tableProps = useMemo(() => {
    return {
      onPaginate: onPaginate,
      showBottomLoader: isFetchingNextPage && hasNextPage,
    };
  }, [hasNextPage, isFetchingNextPage]);


  return {
    onPaginate,
    tableData,
    search,
    setSearch,
    tableProps,
    setTableData,
  };
};

export default useInfiniteTable;
