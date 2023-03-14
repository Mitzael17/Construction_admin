import {ClientsList} from "../types/API/clients";
import {ErrorResponse, GetRequestDefaultParameters} from "../types/API";
import {$authAPI} from "./index";

export const $getClients = async (parameters: GetRequestDefaultParameters): Promise<ClientsList|ErrorResponse> => {

    const {data} = await $authAPI.get('/clients', {
        params: parameters
    });

    return data;

}