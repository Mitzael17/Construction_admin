import {CLIENTS_ROUTE, MESSAGES_ROUTE, PROJECTS_ROUTE} from "./paths";
import Projects from "../pages/Projects/Projects";
import Project from "../pages/Project/Project";

export const routes = [
    {
        path: PROJECTS_ROUTE,
        element: <Projects />,
        name_path: 'projects',
    },
    {
        path: PROJECTS_ROUTE + ':id',
        element: <Project />,
        name_path: 'projects_edit',
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