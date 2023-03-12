export interface RouteResponse {

    sidebar: Sidebar,
    routes: string[]

}

interface List {

    name: string,
    values: string[]

}

type Sidebar = (string|List)[];