import {Client, ClientsList} from "../types/API/clients";
import {EndPoints, ErrorResponse, GetRequestDefaultParameters} from "../types/API";
import {$baseGetRequest} from "./index";

export const $getClients = async (parameters: GetRequestDefaultParameters): Promise<ClientsList|ErrorResponse> => {

    return await $baseGetRequest(EndPoints.clients, parameters);

}


export const $getClient = async (id: number): Promise<Client|ErrorResponse> => {

    return await $baseGetRequest(EndPoints.client + id);

}