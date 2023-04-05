import {UserAccountsResponse} from "./usersAPI";
import {DefaultGetListParameters} from "./index";

export interface Log {
    admin: Pick<UserAccountsResponse, 'name'|'image'|'role'>,
    message: string,
    date_and_time: string,
    id: number
}

export type Logs = Log[];


export interface LogsListParameters extends DefaultGetListParameters {

    date_to?: string,
    date_from?: string

}