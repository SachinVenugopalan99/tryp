import { Stack, Switch, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { EyeIcon } from "../../../assets/icons";

import ActionPopover from "../ActionPopover";

const ViewPreferences: FC<any> = (props) => {
  const { dataList, anchorEl, handleClose } = props;

  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (key: string) => {
    if (selected?.includes(key)) {
      setSelected((current) => current?.filter((item) => item !== key));
    } else {
      setSelected((current) => [...current, key]);
    }
  };

  const handleApply = () => {
    dataList?.handleApplyViewColumns(selected);
    handleClose();
  };

  useEffect(() => {
    if (anchorEl) setSelected(dataList?.viewColumns);
  }, [anchorEl, dataList?.viewColumns]);

  return (
    <ActionPopover icon={<EyeIcon />} title="View Preferences" anchorEl={anchorEl} handleClose={handleClose} onSubmit={handleApply} submitDisabled={!selected?.length}>
      <Stack flexWrap="wrap">
        {dataList?.columns?.map((column: any, index: any) => (
          <Stack key={index} direction="row" alignItems="center" justifyContent="space-between" gap={8}>
            <Typography sx={{ fontSize: "14px", cursor: "pointer" }} onClick={() => handleSelect(index)}>
              {column?.label}
            </Typography>
            <Switch checked={selected?.includes(index)} onClick={() => handleSelect(index)} />
          </Stack>
        ))}
      </Stack>
    </ActionPopover>
  );
};

export default ViewPreferences;
