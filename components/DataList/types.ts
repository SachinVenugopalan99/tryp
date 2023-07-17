import React, { ReactNode } from "react";

export type AlignType = "center" | "inherit" | "justify" | "left" | "right";
export type Order = "asc" | "desc";

export const enum DATA_LIST_VARIANT {
  TABLE = "TABLE",
  GRID = "GRID",
}

export interface ColumnProps {
  label: string;
  align?: AlignType;
  sortKey?: string;
  defaultSort?: Order;
  defaultHidden?: boolean;
}

export interface ExportColumnProps {
  label: string;
  hidden?: boolean;
}

export interface RowActionProps {
  icon?: (item: any) => React.ReactNode;
  label: (item: any) => string;
  hidden?: (item: any) => boolean;
  disabled?: (item: any) => boolean;
  onClick: (item: any) => void;
  color?: (item: any) => string;
  confirmation?: (item?: any) => {
    title: string;
    description?: string;
    content?: React.ReactNode;
    confirmBtnText?: string;
    cancelBtnText?: string;
  };
}

export interface RowCreatorItem {
  content: React.ReactNode;
  align?: AlignType;
}

export interface RowCreatorProps {
  (item: any): RowCreatorItem[];
}

export interface GridCreatorItem {
  title?: ReactNode;
  content: React.ReactNode;
}

export interface GridCreatorProps {
  (item: any): GridCreatorItem;
}

export interface SearchBarProps {
  placeholder?: string;
}

export interface utilParameters {
  presets?: { initialConfig: { viewColumns: { key: string; indexes: string[] } }; common: { rowsPerPage: number; viewVariant: string | null } };
  storeViewColumns: (selection: string[]) => void;
  storeRowsPerPage: (rowsPerPage: number) => void;
  storeViewVariant: (variant: string) => void;
}

export interface UseDataListHook {
  util?: utilParameters;
  hideViewColumn?: boolean;
  hideActionBar?: boolean;
  data: any;
  flatActions?: boolean;
  totalRecords?: any;
  loading?: boolean;
  columns: ColumnProps[];
  rowActions?: RowActionProps[];
  reload?: (args?: any) => void;
  rowCreator?: RowCreatorProps;
  gridCreator?: GridCreatorProps;
  maxHeight?: number | string;
  searchBar?: SearchBarProps;
  emptyDataText?: string;
}

export interface DataListProps {
  dataList: any;
}
