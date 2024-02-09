import { type } from "os";
import { Action, EntityStatus, PAGE_STATE_ACTIONS } from "./enums";
import { GridPaginationModel } from "@mui/x-data-grid";

export type RecordsDto<T> = {
    data: T[],
    page: number,
    records: number,
    size: number
}

export type TSelected = number[] | string[];

export type REDUCER_ACTION = {
    action: PAGE_STATE_ACTIONS,
    payload?: unknown
}

export type PageState <T> = {
    title: string;
    description: string;
    data: T;
    rows: T[];
    showAlert: boolean;
    showDetails: boolean;
    loading: boolean;
    status: EntityStatus,
    action: Action,
    records: number,
    create: boolean;
    selected: TSelected;
    paginationModel: GridPaginationModel,
    target: {
        id: number,
        status: EntityStatus
    },
    search: boolean;
}

export type color = "info" | "success" | "warning" | "error" | "primary" | "default" | "secondary" | undefined;