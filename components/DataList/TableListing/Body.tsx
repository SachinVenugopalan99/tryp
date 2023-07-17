import { Box, Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import React, { FC } from "react";
import { BsDashLg } from "react-icons/bs";

import { DataListProps } from "../types";

export const Body: FC<DataListProps> = (props) => {
  const { dataList } = props;

  return (
    <TableBody>
      {dataList?.data?.length
        ? dataList?.data?.map((row: any, index: any) => (
            <TableRow key={row?.uuid}
            sx={{
              background: index %2 === 0 ? '#eaeaea' : 'white',
              borderBottom: "2px solid black",
              "& th": {
                fontSize: "1.25rem",
                color: "rgba(96, 96, 96)"
              }
            }}
            >

              {dataList
                ?.rowCreator(row)
                ?.filter((_: any, index: number) => dataList?.viewColumns?.includes(index))
                .map((item: any, index: number) => (
                  <TableCell key={index} align={item?.align || "left"}>
                    {dataList?.loading ? (
                      <Skeleton height="20px" width="100%">
                        <Box sx={{ width: "100%", visibility: "hidden" }}>{item?.content}</Box>
                      </Skeleton>
                    ) : (
                      item?.content || <BsDashLg />
                    )}
                  </TableCell>
                ))}
            </TableRow>
          ))
        : Array(10)
            .fill(null)
            .map((_, index) => (
              <TableRow key={index}>
                {dataList?.columns
                  ?.filter((_: any, index: number) => dataList?.viewColumns?.includes(index))
                  ?.map((_: any, key: any) => (
                    <TableCell key={key}>
                      <Skeleton height="20px" width="100%" />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
    </TableBody>
  );
};

export default Body;
