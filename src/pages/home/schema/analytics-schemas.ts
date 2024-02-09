
export type AdminCountSummary = {
    users: number;
    merchants: number;
    bills: number;
    collection: number;
}

export type SuccessRate = {
    success: number;
    failed: number;
    pending: number;
    other: number;
}