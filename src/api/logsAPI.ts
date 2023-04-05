import {Logs, LogsListParameters} from "../types/API/logs";
import {EndPoints} from "../types/API";
import {$baseGetRequest} from "./index";

export const $getLogs = async (parameters: LogsListParameters): Promise<Logs> => {

    return await $baseGetRequest(EndPoints.logs, parameters);

}