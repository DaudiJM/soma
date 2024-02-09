import { Breakpoint } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid/models";
import { ReactNode } from "react";

export type CardInterface = {
    title?: string;
}

export type DialogInterface = {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    loading?: boolean;
    width?: Breakpoint;
}

export type PaginationModel = {
    page: number;
    pageSize: number;
}

export type DataTableInterface = {
    columns:  GridColDef[];
    rows: any[];
    records: number;
    paginationModel: PaginationModel;
    onPaginationModelChange: Function;
    loading?: boolean;
}

export type TablecellInterface = {
    property: string;
    value: ReactNode
}

export type CustomTableInterface = {
    columns: string[];
    rows: TablecellInterface[]
}
