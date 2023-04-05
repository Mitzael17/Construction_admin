import {CLIENTS_ROUTE, LOGS_ROUTE, MESSAGES_ROUTE, PROJECTS_ROUTE} from "./paths";
import Project from "../pages/Project/Project";
import ProjectsPage from "../pages/Projects/ProjectsPage";
import LogsPage from "../pages/Logs/LogsPage";

export const routes = [
    {
        path: PROJECTS_ROUTE,
        element: <ProjectsPage />,
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
    {
        path: LOGS_ROUTE,
        element: <LogsPage />,
        name_path: 'logs'
    }
];