
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
    __typename?: 'IQuery';
    hello(): Nullable<string> | Promise<Nullable<string>>;
    now(): Nullable<DateTime> | Promise<Nullable<DateTime>>;
    input(data?: Nullable<DateTime>): Nullable<DateTime> | Promise<Nullable<DateTime>>;
}

export interface ISubscription {
    __typename?: 'ISubscription';
    inputUpdated(): Nullable<DateTime> | Promise<Nullable<DateTime>>;
}

export type DateTime = string;
type Nullable<T> = T | null;
