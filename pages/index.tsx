import type { NextPage } from 'next'
import { Box, Divider, Stack } from "@mui/material";
import { useCallback, useEffect, useState, useMemo } from "react";
import { ColumnProps, RowCreatorProps, GridCreatorProps } from '../components/DataList/types';
import DataList from '../components/DataList';
import useDataList from '../components/DataList/useDataList';
import KeyValuePair from '../components/DataList/KeyValue';

const Home: NextPage = () => {
  const [data, setData] =useState<any>([]);
  const [loading, setIsLoading] = useState(false);
  const fetchList = useCallback((payload: any) => {
    const {page, size, sortBy, sortDesc, search } = payload;
    setIsLoading(true)
    try{
    fetch(`https://api.github.com/search/repositories?q=${search}&sort=${sortBy}&order=${sortDesc}&page=${page}&per_page=${size}`)
    .then((response) => response.json())
    .then((data) => setData(data));
    } catch (e){

    } finally{
      setIsLoading(false);
    }
  },[setData, setIsLoading])
  const reload = useCallback(
    ({ page, size, sortBy, sortDesc, search } : any) => {
      fetchList({ page, size, sortBy, sortDesc:sortDesc? 'desc': 'asc', search : search || null });
    },
    [fetchList],
  );

  const columns: ColumnProps[] = useMemo(
    () => [
      { label: "NAME", sortKey: "name" },
      { label: "DEFAULT BRANCH", align: "center", sortKey: "default_branch" },
      { label: "FORKS" },
      { label: "LANGUAGE" },
      { label: "VISIBILITY", sortKey: "visibility" },
      { label: "WATCHERS", sortKey: "watchers" },
      { label: "CREATED DATE", sortKey: "created_at" },
    ],
    [],
  );

  const rowCreator: RowCreatorProps = useCallback(
    (item: any) => [
      {
        content: item?.name
      },
      { content: item?.default_branch ? item?.default_branch : null, align: "center" },
      { content: item?.forks },
      { content: item?.language },
      { content: item?.visibility },
      { content: item?.watchers },
      { content: item?.created_at },
    ],
    [],
  );

  const gridCreator: GridCreatorProps = useCallback(
    (item: any) => ({
      header: item?.name,
      content: (
        <Stack flex={1} sx={{ borderRadius: "0px 0px 8px 8px", height: "100%" }}>
          <Stack flex={1} direction="row" divider={<Divider flexItem orientation="vertical" />} gap={2}>
            <Stack flex={1} gap={2} sx={{ p: "12px 16px" }}>
            <KeyValuePair label="Branch" value={item?.default_branch} />
           <KeyValuePair label="Forks" value={item?.forks} />
             <KeyValuePair label="Language" value={item?.language} />
            </Stack>
            <Stack flex={1} gap={2} sx={{ p: "12px 16px" }}>
            <KeyValuePair label="Visibility" value={item?.visibility} />
              <KeyValuePair label="Watchers" value={item?.watchers} />
              <KeyValuePair label="Created At" value={item?.created_at} />
            </Stack>
          </Stack>
        </Stack>
      ),
    }),
    [],
  );

  const dataList = useDataList({
    data: data?.items,
    totalRecords: data?.total_count,
    loading,
    columns,
    gridCreator,
    rowCreator,
    searchBar: { placeholder: "Search Repositories" },
    reload,
  });
  return (
<Stack padding={4}>
  <DataList dataList={dataList} />
</Stack>
  )
}

export default Home
