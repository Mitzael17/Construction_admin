import {$API} from "./index";
import {LoginResponse} from "../types/responsesAPI";
import {setCookie} from "../utils/cookie";


export const $login = async (name: string, password: string): Promise<LoginResponse> => {

    const {data}: {data: LoginResponse} = await $API.post('/login', {name, password});

    if(data.status === 'success') {

        setCookie('token', data.token, {"max-age": 3600});

    }

    return data;


}