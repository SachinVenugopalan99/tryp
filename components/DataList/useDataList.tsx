import React, { useCallback, useEffect, useMemo, useReducer } from "react";

import { DATA_LIST_VARIANT, UseDataListHook } from "./types";

const initialState = {
  variant: null,
  page: 1,
  rowsPerPage: 10,
  order: "asc",
  orderBy: null,
  search: "",
  viewColumns: [],
  triggerReload: false,
  checkedRows: [],
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "setVariant":
      return { ...state, variant: action.payload };
    case "setPage":
      return { ...state, page: action.payload };
    case "setRowsPerPage":
      return { ...state, rowsPerPage: action.payload };
    case "setOrder":
      return { ...state, order: action.payload };
    case "setOrderBy":
      return { ...state, orderBy: action.payload };
    case "setSearch":
      return { ...state, search: action.payload };
    case "setViewColumns":
      return { ...state, viewColumns: action.payload };
    case "setTriggerReload":
      return { ...state, triggerReload: action.payload };
    case "setCheckedRows":
      return { ...state, checkedRows: action.payload };
    default:
      return state;
  }
}

export const useDataList = (config: UseDataListHook) => {
  const {
    util = null,
    data,
    totalRecords,
    loading = false,
    columns,
    hideViewColumn = false,
    flatActions = false,
    rowActions,
    reload,
    rowCreator,
    gridCreator,
    emptyDataText = "No Data",
    maxHeight = "auto",
    searchBar,
  } = config;

  const [reducerState, reducerDispatch] = useReducer(reducer, initialState);
  const { variant, page, rowsPerPage, order, orderBy, search, viewColumns, triggerReload, checkedRows } = reducerState;

  const isIndeterminate: boolean = useMemo(() => checkedRows?.length > 0 && checkedRows?.length < data?.length, [checkedRows, data]);
  const isDeterminate: boolean = useMemo(() => data?.length > 0 && checkedRows?.length === data?.length, [checkedRows, data]);

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: any) => {
      const isAsc = orderBy === property && order === "asc";

      reducerDispatch({ type: "setOrder", payload: isAsc ? "desc" : "asc" });
      reducerDispatch({ type: "setOrderBy", payload: property });
      reducerDispatch({ type: "setTriggerReload", payload: true });
    },
    [order, orderBy, reducerDispatch],
  );

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      reducerDispatch({ type: "setPage", payload: newPage });
      reducerDispatch({ type: "setTriggerReload", payload: true });
    },
    [reducerDispatch],
  );

  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      reducerDispatch({ type: "setPage", payload: 1 });
      reducerDispatch({ type: "setRowsPerPage", payload: parseInt(event.target.value, 10) });
      util?.storeRowsPerPage(parseInt(event.target.value, 10));
      reducerDispatch({ type: "setTriggerReload", payload: true });
    },
    [reducerDispatch, util],
  );

  const handleApplyViewColumns = useCallback(
    (columns: string[]) => {
      reducerDispatch({ type: "setViewColumns", payload: columns });
      util?.storeViewColumns(columns);
    },
    [reducerDispatch, util],
  );

  const handleSearch = useCallback(
    (key: string) => {
      reducerDispatch({ type: "setPage", payload: 1 });
      reducerDispatch({ type: "setSearch", payload: key });

      reducerDispatch({ type: "setTriggerReload", payload: true });
    },
    [reducerDispatch],
  );

  const handleClearSearch = useCallback(() => {
    reducerDispatch({ type: "setPage", payload: 1 });
    reducerDispatch({ type: "setSearch", payload: "" });
    reducerDispatch({ type: "setTriggerReload", payload: true });
  }, [reducerDispatch]);

  const handleChangeVariant = useCallback(
    (variant: any) => {
      reducerDispatch({ type: "setVariant", payload: variant });
      util?.storeViewVariant(variant);
    },
    [util],
  );

  const handleFetchList = useCallback(() => {
    reload?.({ page, size: rowsPerPage, sortBy: orderBy, sortDesc: order !== "asc", search });
  }, [page, rowsPerPage, order, orderBy, search, reload]);

  useEffect(() => {
    if (triggerReload) {
      handleFetchList();
      reducerDispatch({ type: "setTriggerReload", payload: false });
    }
  }, [handleFetchList, triggerReload]);

  useEffect(() => {
    // get column with default sorting enabled
    const defaultSorting = columns?.find((column) => column?.defaultSort);

    if (defaultSorting) {
      reducerDispatch({ type: "setOrder", payload: defaultSorting?.defaultSort });
      reducerDispatch({ type: "setOrderBy", payload: defaultSorting?.sortKey });
    }

    reducerDispatch({ type: "setTriggerReload", payload: true });
  }, [reducerDispatch, columns]);

  useEffect(() => {
    if (util?.presets?.initialConfig?.viewColumns) {
      reducerDispatch({ type: "setViewColumns", payload: util?.presets?.initialConfig?.viewColumns });
    } else {
      reducerDispatch({
        type: "setViewColumns",
        payload: columns
          ?.map((item, index) => ({ ...item, indexKey: index }))
          ?.filter((item) => !item?.defaultHidden)
          ?.map((item) => item?.indexKey),
      });
    }
  }, [columns, util?.presets?.initialConfig]);

  useEffect(() => {
    if (util?.presets?.common?.rowsPerPage) {
      reducerDispatch({ type: "setRowsPerPage", payload: util?.presets?.common?.rowsPerPage });
    }
  }, [columns, util?.presets?.common?.rowsPerPage]);

  useEffect(() => {
    if (rowCreator && gridCreator) {
      if (util?.presets?.common?.viewVariant) {
        reducerDispatch({ type: "setVariant", payload: util?.presets?.common?.viewVariant });
      } else {
        reducerDispatch({ type: "setVariant", payload: DATA_LIST_VARIANT.TABLE });
      }
    } else if (rowCreator) {
      reducerDispatch({ type: "setVariant", payload: DATA_LIST_VARIANT.TABLE });
    } else if (gridCreator) {
      reducerDispatch({ type: "setVariant", payload: DATA_LIST_VARIANT.GRID });
    }
  }, [rowCreator, gridCreator, util?.presets?.common?.viewVariant]);

  return {
    rowActions,
    columns,
    data,
    loading,
    order,
    orderBy,
    page,
    rowsPerPage,
    search,
    totalRecords,
    variant,
    viewColumns,
    triggerReload,
    hideViewColumn,
    maxHeight,
    isIndeterminate,
    isDeterminate,
    searchBar,
    flatActions,
    emptyDataText,

    handleApplyViewColumns,
    handleChangePage,
    handleClearSearch,
    handleFetchList,
    handleRequestSort,
    handleRowsPerPageChange,
    handleSearch,
    rowCreator,
    gridCreator,
    handleChangeVariant,
  };
};

export default useDataList;
