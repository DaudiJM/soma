import { GridPaginationModel } from "@mui/x-data-grid/models";
import { Action, DETAILS_PAGE_ACTION, EntityStatus, PAGE_STATE_ACTIONS } from "../../utils/enums";
import { PageState, REDUCER_ACTION, RecordsDto, TSelected } from "../../utils/schema";
import { useReducer } from "react";

const usePage = <T> (status: EntityStatus) => {
    const init: PageState<T> = {
        title: "",
        data: {} as T,
        rows: [] as T[],
        loading: false,
        showAlert: false,
        showDetails: false,
        action: Action.Activate,
        status: status,
        create: false,
        records: 0,
        selected: [],
        paginationModel: { page: 0, pageSize: 5 },
        description: "",
        target: { id: 0, status: EntityStatus.ACTIVE },
        search: false
    };

    const reducer = (state: PageState<T>, reducerAction: REDUCER_ACTION):PageState<T> => {
        switch(reducerAction.action){
            case PAGE_STATE_ACTIONS.SET_COUNT:
                return {...state, records: reducerAction?.payload as number}
            case PAGE_STATE_ACTIONS.SET_STATUS:
                return {...state, status: reducerAction?.payload as EntityStatus}
            case PAGE_STATE_ACTIONS.SET_TITLE:
                return {...state, title: reducerAction?.payload as string}
            case PAGE_STATE_ACTIONS.SET_ROWS:
                return {...state, rows: reducerAction.payload as T[]}
            case PAGE_STATE_ACTIONS.SET_DATA:
                return {...state, data: reducerAction?.payload as T}
            case PAGE_STATE_ACTIONS.SET_PAGINATION_MODEL:
                return { ...state, paginationModel: reducerAction?.payload as GridPaginationModel}
            case PAGE_STATE_ACTIONS.TOGGLE_CREATE:
                return {...state, create: !state.create}
            case PAGE_STATE_ACTIONS.TOGGLE_CONFIRMATION:
                return {...state, showAlert: !state.showAlert}
            case PAGE_STATE_ACTIONS.TOGGLE_ALERT:
                return {...state, showAlert: !state.showAlert}
            case PAGE_STATE_ACTIONS.SET_SELECTED:
                return {...state, selected: reducerAction?.payload as TSelected}
            case PAGE_STATE_ACTIONS.TOGGLE_DETAILS:
                return {...state, showDetails: !state.showDetails}
            case PAGE_STATE_ACTIONS.SET_DESCRIPTION:
                return {...state, description: reducerAction?.payload as string}
            case PAGE_STATE_ACTIONS.SET_RECORDS:
                const payloadData:number = reducerAction.payload as number;
                return {
                    ...state,
                    records: payloadData ?? 0
                }
            case PAGE_STATE_ACTIONS.SET_TARGET:
                return {...state, target: reducerAction?.payload as typeof init.target}
            case PAGE_STATE_ACTIONS.TOGGLE_SEARCH:
                return {...state, search: !state.search}
        }
    };

    const [state, dispatch] = useReducer(reducer, init);

    return [state, dispatch] as const;
}

export default usePage;

type DetailsPageState <T> = {
    update: boolean;
    confirmation: boolean;
    alert: boolean;
    data: T;
    title: string;
    status: EntityStatus;
}

type DETAILS_REDUCER_ACTIONS = {
    action: DETAILS_PAGE_ACTION;
    payload?: unknown
}

export const useDetails = <T> () => {
    const init: DetailsPageState<T> = {
        alert: false,
        confirmation: false,
        data: {} as T,
        update: false,
        status: EntityStatus.ACTIVE,
        title: ""
    }

    const reducer = (state: DetailsPageState<T>, { action, payload}: DETAILS_REDUCER_ACTIONS):DetailsPageState<T> => {
        switch(action){
            case DETAILS_PAGE_ACTION.SET_DATA:
                return {...state, data: payload as T}
            case DETAILS_PAGE_ACTION.TOGGLE_ALERT:
                return {...state, alert: !state.alert};
            case DETAILS_PAGE_ACTION.TOGGLE_CONFIRMATION:
                return {...state, confirmation: !state.confirmation};
            case DETAILS_PAGE_ACTION.TOGGLE_UPDATE:
                return {...state, update: !state.update};
            case DETAILS_PAGE_ACTION.SET_TITLE:
                return {...state, title: payload as string};
            case DETAILS_PAGE_ACTION.SET_STATUS:
                return {...state, status: payload as EntityStatus}
        }
    }

    const [state, dispatch] = useReducer(reducer, init);

    return [state, dispatch] as const;
}