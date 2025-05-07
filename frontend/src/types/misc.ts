/*
 * misc.ts
 *
 * miscellanies things we need
 * very big brain and usefull
 */

// The object id that is used to represent a null object id
export const NIL_OBJECT_ID = "000000000000000000000000";

// This is a random, but valid object id. It is mainly used when
// we resolve a ticket, we just set the id to this so we do not need to
// find out who actually resolve the ticket, but still resolve it on the UI
export const RANDOM_OBJECT_ID = "000000000000000000000001";

// These are the two modes in which the app can be running in
// they are used to determine if we are in development or production mode
export enum Mode {
    development = "development",
    production = "production",
}

// This is for the date range picker slider thing
export type DateRangeBounds = {
    startDate: Date | null;
    endDate: Date;
};


// Link for the tutorial video.
export const TUTORIAL_VIDEO_LINK = "https://m.youtube.com/watch?v=WM2OGtY4S-w";
