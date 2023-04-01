import {$baseGetRequest} from "./index";
import {EndPoints, ErrorResponse} from "../types/API";
import {RouteResponse} from "../types/API/routes";

export const $getRoutesAndSidebar = async (): Promise<ErrorResponse|RouteResponse> => {

    return await $baseGetRequest(EndPoints.route);

}