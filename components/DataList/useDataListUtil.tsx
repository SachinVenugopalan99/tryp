import { useCallback, useMemo } from "react";

export const useDataListUtil = (config: any) => {
  const {
    presets, 
    handleUpdateConfig,
  } = config;

  const dataListKey = 'table'

  const state = useMemo(
    () => ({ common: presets?.common, initialConfig: presets?.configs?.find((item: any) => item?.key === dataListKey) }),
    [dataListKey, presets?.common, presets?.configs],
  );

  const handleStoreViewColumns = useCallback(
    (viewColumns: string[]) => {
      handleUpdateConfig({ type: "viewColumns", payload: { key: dataListKey, viewColumns } });
    },
    [dataListKey, handleUpdateConfig],
  );

  const handleStoreRowsPerPage = useCallback(
    (rowsPerPage: number) => {
      handleUpdateConfig({ type: "rowsPerPage", payload: rowsPerPage });
    },
    [handleUpdateConfig],
  );

  const handleStoreViewVariant = useCallback(
    (variant: string) => {
      handleUpdateConfig({ type: "viewVariant", payload: variant });
    },
    [handleUpdateConfig],
  );

  return {
    presets: state, 

    storeViewColumns: handleStoreViewColumns,
    storeRowsPerPage: handleStoreRowsPerPage,
    storeViewVariant: handleStoreViewVariant,
  };
};

export default useDataListUtil;
