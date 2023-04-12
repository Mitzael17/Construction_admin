import {Service} from "../types/API/services";
import {EndPoints, ErrorResponse} from "../types/API";
import {$baseGetRequest} from "./index";


export const $getService = async (id: number): Promise<Service|ErrorResponse> => {

    return await $baseGetRequest(EndPoints.service + id);

}