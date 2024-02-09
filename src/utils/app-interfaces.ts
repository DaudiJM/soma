import { GridCellParams } from "@mui/x-data-grid";
import { ReactNode } from "react";
import { PaginationModel } from "../core/components/component-interfaces";
import { Action, DETAIL_REDUCER_ACTION_TYPE, REDUCER_ACTION_TYPE, Role, EntityStatus } from "./enums";
import User from "pages/user/schema";


export type ChipColors = "warning" | "info" | "success" | "error" | "primary" | "default" | "secondary";

export type Colors = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;


export interface RequestHeaderInterface {
    userId: number;
}


export interface RequestInterface <T>{
    header: RequestHeaderInterface;
    data: T
}
export interface ResponseHeaderInterface {
    responseCode: string;
    responseMessage: string;
    token: string;
}

export interface ResponseBodyInterface <T>{
    data: T
}

export interface ResponseInterface <T> {
    header: ResponseHeaderInterface;
    data: T
}

export type AxiosConfig <T, H> = {
    url: string;
    data?: T;
    response: H;
    params?: object;
    formData?: FormData
}


export interface MenuItemsInterface {
    route: string;
    icon: ReactNode;
    title: string;
}

export interface MerchantInterface {
    id: number;
    name: string;
    shortName: string;
    createdAt: string;
    providerPassword: string;
    sourceUrl: string;
    callbackUrl: string;
    b2cNumber: string;
    c2bNumber: string;
    initiatorPassword: string;
    initiator: string;
    sendingProtocol: string;
    notify: boolean;
    username: string;
    prefix: string;
    availableBalance: number;
    actualBalance: number;
    email: string;
    physicalAddress: string;
    lastUpdatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    msisdn: string;
    shortCode: string;
    collectionUrl: string;
}


export interface AuthenticationInterface {
    username: string;
    password: string;
}

export interface PagePropsInterface <T>{
    data: T;
    reload: Function;
}


export interface ChangePasswordInterface {
    currentPassword: string;
    password: string;
    confirmedPassword: string;
};


export interface ActionsInterface {
    entity: string;
    roles: Role[];
    params: GridCellParams<any, any, any>;
    actionHandler: (action:Action, params: GridCellParams<any, any, any>) => void;
    actions?: ReactNode[] | null
}

interface ExceptionResponse {
    error: string;
    status: number;
}

export interface AxiosError{
    message: string;
    name: string;
    stack: string
    config: {},
    code: string,
    response: {
        status: number;
        data: ResponseInterface<ExceptionResponse>
    }
}

export interface ChangeStatusInterface {
    id: number;
    status: EntityStatus;
}

export interface SystemConfigInterface {
    portalUrl: string;
    smsServiceUrl: string;
    smsServiceUsername: string;
    smsServicePassword: string;
    notificationPeriod: number;
    mailServiceUrl: string;
}


export interface PaginatorInterface {
    pageSize: number;
    page: number;
}


export interface RecordResponse<T>{
    data: T[];
    records: number
}


export interface PageStateInterface <T>{
    showAlertModal: boolean;
    showCreatePage: boolean;
    showConfirmationModal: boolean;
    title: string;
    records: number;
    paginationModel: PaginationModel;
    status: EntityStatus;
    loading: boolean;
    rows: T[];
    data: T;
}

export type ReducerAction  = {
    action: REDUCER_ACTION_TYPE;
    payload?: any; 
}

export interface AuthStateInterface {
    isUserAuthenticated: boolean;
    roles?: string[];
    setAuthState: (state: boolean) => void;
    setRoles: (roles: string[]) => void;
    user: User;
    setUser: (user: User) => void;
    token: string;
    setToken: (token: string) => void;
}


export interface DetailsPageStateInterface<T> {
    data: T;
    openCreateModal: boolean;
    openConfirmationModal: boolean;
    title: string;
    status: EntityStatus;
    loading: boolean;
}

export interface DetailsReducerAction {
    action: DETAIL_REDUCER_ACTION_TYPE,
    payload?: any
}

export interface StorageResponse {
    fileName: string;
    fileSize: number;
    downloadPath: string;
}

export interface ChargeInterface {
    id: number;
    fromAmount: number;
    toAmount: number;
    processingFee: number;
    status: string;
    createdAt: string;
    lastUpdatedAt: string;
    createdBy: string;
}

export interface BillInterface {
    id: number;
    paymentDate: string;
    date: string;
    msisdn: string;
    amount: number;
    receipt: string;
    reference: string;
    transactionNumber: string;
    resCode: string;
    resDesc: string;
    dateInitialized: string;
    dateFinalized: string;
    status: string;
    type: string;
    respDesc: string;
    respCode: string;
    conversiontId: string;
    origiatorConversitionId: string;
    provider: string;
    commandId: string;
    reported: boolean;
    name: string;
    paymentType: string;
    reason: string;
    bankAccont: string;
    bankReceiptNumber: string;
    bankReference: string;
    amountType: string;
    paymentChannel: string;
    payerNumber: string;
    bankTransactionReference: string;
    amountPaid: number;
    amountSent: number;
    paidNumbers: string;
    parent: string;
    channel: string;
}

export interface PaymentInterface {
    id: number;
    amount: number;
    controllNumber: string;
    currency: string;
    receiptNumber: string;
    referenceNumber: string;
    payerName: string;
    paymentDate: string;
    transactionDate: string;
    payerMsisdn: string;
    channel: string;
}

export interface FaqInterface {
    id: number,
    question: string,
    description: string
    createdAt: string
    createdBy: string;
    status: string;
}

export type GraphData = {
    name: string;
    value: number;
}

export type GraphCollection = {
    key: string;
    value: string;
    data: GraphData[];
}