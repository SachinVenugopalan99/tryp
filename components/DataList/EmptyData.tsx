import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface EmptyDataProps {
  text: string;
}

const EmptyData: FC<EmptyDataProps> = ({ text }) => {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={1} p={3}>

      <Typography fontWeight="500" sx={{ color: "grey.600" }}>
        {text}
      </Typography>
    </Stack>
  );
};

export default EmptyData;
