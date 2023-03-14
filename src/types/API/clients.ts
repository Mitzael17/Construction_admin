import {BaseData} from "./index";

interface ClientInList extends BaseData{

    email: string,
    image: string,
    entity: 'individual'|'legal',
    total_projects: number

}

export type ClientsList = ClientInList[];