export const NIL_OBJECT_ID = "000000000000000000000000";
export const RANDOM_OBJECT_ID = "000000000000000000000001";


export enum Mode {
    development = "development",
    production = "production",
}

export type DateRangeBounds = {
    startDate: Date | null;
    endDate: Date 
}
