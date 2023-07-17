import { Box, TableCell, TableHead, TableRow, TableSortLabel, Tooltip } from "@mui/material";
import { FC } from "react";

import { DataListProps } from "../types";

export const Header: FC<DataListProps> = (props) => {
  const { dataList } = props;

  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    dataList?.handleRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow
      sx={{
        borderBottom: "2px solid black",
        "& th": {
          fontSize: "1.25rem",
          color: "rgba(96, 96, 96)",
        }
      }}
      >
        {dataList?.columns
          ?.filter((_: any, index: any) => dataList?.viewColumns?.includes(index))
          ?.map((headCell: any, key: any) => (
            <TableCell key={key} align={headCell?.align || "inherit"}>
              {headCell?.sortKey ? (
                <Tooltip title={`Click to sort ${dataList?.orderBy === headCell?.sortKey && dataList?.order === "asc" ? "descending" : "ascending"}`} placement="top" arrow>
                  <TableSortLabel
                    active={dataList?.orderBy === headCell?.sortKey}
                    direction={dataList?.orderBy === headCell?.sortKey ? dataList?.order : "asc"}
                    onClick={createSortHandler(headCell?.sortKey)}
                    sx={{ display: "inline-block", width: "100%", ":hover": { color: "inherit" } }}>
                    <Box component="span" mr={1}>
                      {headCell?.label}
                    </Box>

                  </TableSortLabel>
                </Tooltip>
              ) : (
                <Box display="inline-block" pt="4px">
                  {headCell?.label}
                </Box>
              )}
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
};

export default Header;
