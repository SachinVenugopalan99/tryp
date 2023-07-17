import { MenuItem, Pagination, Select, Stack } from "@mui/material";
import { FC } from "react";

import { DataListProps } from "./types";

export const DataListPagination: FC<DataListProps> = (props) => {
  const { dataList } = props;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      padding="8px 20px"
      sx={{ color: "text.gray", borderTop: "1px solid", borderColor: "grey.400" }}>
      <Pagination
        count={Math.ceil(dataList?.totalRecords / dataList?.rowsPerPage)}
        page={dataList?.page}
        onChange={dataList?.handleChangePage}
        variant="outlined"
        shape="rounded"
      />

      <Select value={dataList?.rowsPerPage} onChange={dataList?.handleRowsPerPageChange} size="small">
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </Stack>
  );
};

export default DataListPagination;
