import {$authAPI} from "./index";
import {EndPoints, ErrorResponse} from "../types/API";
import {RouteResponse} from "../types/API/routes";

export const $getRoutesAndSidebar = async (): Promise<ErrorResponse|RouteResponse> => {

    const {data} = await $authAPI.get(EndPoints.route);

    return data;

}