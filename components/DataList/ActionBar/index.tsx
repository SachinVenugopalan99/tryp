import { IconButton, InputAdornment, Stack, TextField, Tooltip } from "@mui/material";
import useSearch from "../../../hooks/useSearch";
import React, { FC, useEffect, useState } from "react";

import { EyeIcon, GridViewIcon, SearchIcon, TableViewIcon } from '../../../assets/icons';

import ViewColumns from "../Popups/ViewPreferences";
import { DATA_LIST_VARIANT, DataListProps } from "../types";

export const enum ANCHOR_TYPE {
  SEARCH = "SEARCH",
  FILTER = "FILTER",
  VIEW_PREFERENCES = "VIEW_PREFERENCES",
}

const ActionBar: FC<DataListProps> = (props) => {
  const { dataList } = props;

  const { localSearchTerm, handleSearch } = useSearch();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | HTMLDivElement | null>(null);
  const [anchorType, setAnchorType] = useState<ANCHOR_TYPE | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setAnchorType(null);
  };

  useEffect(() => {
    dataList?.handleSearch(localSearchTerm);
  }, [localSearchTerm]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2} px={"20px"} py={2} sx={{ color: "grey" }}>
        {dataList?.searchBar ? (
          <TextField
            variant="outlined"
            placeholder={dataList?.searchBar?.placeholder || "Search"}
            onChange={handleSearch}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ color: "grey" }}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              input: { pl: 1, pr: 0, width: "300px" },
              fieldset: { border: "1px solid" },
            }}
          />
        ) : null}
          <Stack direction="row" alignItems="center" spacing={"12px"}>
            {!dataList?.hideViewColumn && dataList?.variant !== DATA_LIST_VARIANT.GRID ? (
              <Tooltip title="View Preferences">
                <IconButton
                  onClick={(e) => {
                    handleOpenPopover(e);
                    setAnchorType(ANCHOR_TYPE.VIEW_PREFERENCES);
                  }}
                  sx={{ border: "1px solid", borderColor: "primary.main", ":hover": { background: "transparent" } }}>
                  <EyeIcon />
                </IconButton>
              </Tooltip>
            ) : null}
            {dataList?.rowCreator && dataList?.gridCreator ? (
              dataList?.variant === DATA_LIST_VARIANT.TABLE ? (
                <Tooltip title="Switch to Grid View">
                  <IconButton
                    onClick={() => dataList?.handleChangeVariant(DATA_LIST_VARIANT.GRID)}
                    sx={{ border: "1px solid", borderColor: "primary.main", ":hover": { background: "transparent" } }}>
                    <GridViewIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Switch to Table View">
                  <IconButton
                    onClick={() => dataList?.handleChangeVariant(DATA_LIST_VARIANT.TABLE)}
                    sx={{ border: "1px solid", borderColor: "primary.main", ":hover": { background: "transparent" } }}>
                    <TableViewIcon />
                  </IconButton>
                </Tooltip>
              )
            ) : null}
          </Stack>
      </Stack>

      {anchorType === ANCHOR_TYPE.VIEW_PREFERENCES ? <ViewColumns dataList={dataList} anchorEl={anchorEl} handleClose={handleClosePopover} /> : null}
    </>
  );
};

export default ActionBar;
