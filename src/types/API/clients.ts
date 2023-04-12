import {BaseData} from "./index";

export interface Client extends BaseData {

    email: string,
    entity: 'individual'|'legal',
    image: string,
    projects: []

}

interface ClientsListItem extends Omit<Client, 'projects'> {

    total_projects: number

}

export type ClientsList = ClientsListItem[];