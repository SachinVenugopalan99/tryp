import { Box, Card, CardContent, Divider, Grid, Skeleton, Stack } from "@mui/material";
import { FC } from "react";
import { DataListProps } from "../types";

const Body: FC<DataListProps> = (props) => {
  const { dataList } = props;

  return (
    <Grid container columnSpacing={2} rowGap={2} mt={1} pb={2} sx={{ maxHeight: "auto", gridAutoRows: "max-content" }}>
      {dataList?.data?.length
        ? dataList?.data?.map((row: any) => (
            <>
              <Grid
                item
                key={row?.uuid}
                >
                <Card
                  sx={{
                    position: "relative",
                    height: "100%",
                    border: "1px solid",
                    borderRadius: "8px",
                    boxShadow: "0",
                  }}>
                  <Stack height="100%" divider={<Divider />}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: "12px 16px" }}>
                      <Stack direction="row" spacing={2} alignItems="center" flex={1}>

                        {dataList?.loading ? (
                          <Stack direction="row" spacing={2} width="100%">
                            <Skeleton height="40px" width="40px" variant="circular" />
                            <Skeleton height="40px" width="30%" />
                          </Stack>
                        ) : (
                          <Box>{dataList?.gridCreator?.(row)?.header}</Box>
                        )}
                      </Stack>
                      <Box>
                      </Box>
                    </Stack>

                    <CardContent sx={{ ...(!dataList?.loading ? { p: 0, ":last-child": { pb: 0 }, height: "100%" } : { p: 2 }) }}>
                      {dataList?.loading ? 'Loading' : dataList?.gridCreator?.(row)?.content}
                    </CardContent>
                  </Stack>
                </Card>
              </Grid>
            </>
          ))
        : Array(10)
            .fill(null)
            .map((_, index) => (
              <Grid
                item
                key={index}
                >
                <Card
                  sx={{
                    position: "relative",
                    height: "100%",
                    backgroundColor: "white",
                    border: "1px solid",
                    borderRadius: "8px",
                    boxShadow: "0",
                  }}>
                  <Stack height="100%" divider={<Divider />}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: "12px 16px" }}>
                      <Stack direction="row" spacing={2} alignItems="center" flex={1}>
                        <Stack direction="row" spacing={2} width="100%">
                          <Skeleton height="40px" width="40px" variant="circular" />
                          <Skeleton height="40px" width="30%" />
                        </Stack>
                      </Stack>
                    </Stack>

                    <CardContent sx={{ ...(!dataList?.loading ? { p: 0, ":last-child": { pb: 0 }, height: "100%" } : { p: 2 }) }}>
                      {'Loading'}
                    </CardContent>
                  </Stack>
                </Card>
              </Grid>
            ))}
    </Grid>
  );
};

export default Body;
