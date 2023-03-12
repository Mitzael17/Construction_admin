import {CLIENTS_ROUTE, MESSAGES_ROUTE, PROJECTS_ROUTE} from "./paths";
import Projects from "../pages/Projects/Projects";

export const routes = [
    {
        path: PROJECTS_ROUTE,
        element: <Projects />,
        name_path: 'projects',
    },
    {
        path: MESSAGES_ROUTE,
        element: <div>Not ready! (messages)</div>,
        name_path: 'messages'
    },
    {
        path: CLIENTS_ROUTE,
        element: <div>Not ready! (clients)</div>,
        name_path: 'clients'
    },
];