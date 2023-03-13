import {CLIENTS_ROUTE, MESSAGES_ROUTE, PROJECTS_ROUTE} from "./paths";
import BoxIcon from "../components/Icons/KalaiIcons/BoxIcon";
import ChevronDownIcon from "../components/Icons/KalaiIcons/ChevronDownIcon";
import ClipboardIcon from "../components/Icons/KalaiIcons/ClipboardIcon";
import DashboardIcon from "../components/Icons/KalaiIcons/DashboardIcon";
import EmailIcon from "../components/Icons/KalaiIcons/EmailIcon";
import FileIcon from "../components/Icons/KalaiIcons/FileIcon";
import HeadsetIcon from "../components/Icons/KalaiIcons/HeadsetIcon";
import LayoutIcon from "../components/Icons/KalaiIcons/LayoutIcon";
import ListClipboardIcon from "../components/Icons/KalaiIcons/ListClipboardIcon";
import ShareIcon from "../components/Icons/KalaiIcons/ShareIcon";
import SuitcaseIcon from "../components/Icons/KalaiIcons/SuitcaseIcon";
import ThumbsUpIcon from "../components/Icons/KalaiIcons/ThumbsUpIcon";
import UserGroupIcon from "../components/Icons/KalaiIcons/UserGroupIcon";


export const sidebarData = {
    projects: {
        icon: <BoxIcon />,
        route: PROJECTS_ROUTE
    },
    messages: {
      icon: <EmailIcon />,
      route: MESSAGES_ROUTE
    },
    clients: {
        icon: <UserGroupIcon />,
        route: CLIENTS_ROUTE
    },
    'pages content': {
        icon: <ChevronDownIcon />,
        route: ''
    },
    partners: {
        icon: <SuitcaseIcon />,
        route: 'f1'
    },
    testimonials: {
        icon: <ThumbsUpIcon />,
        route: 'f2'
    },
    layouts: {
        icon: <LayoutIcon />,
        route: 'f3'
    },
    news: {
        icon: <ClipboardIcon />,
        route: 'f4'
    },
    contacts: {
        icon: <HeadsetIcon />,
        route: 'f5'
    },
    'other data': {
        icon: <ChevronDownIcon />,
        route: ''
    },
    subscribers: {
        icon: <ShareIcon />,
        route: 'f6'
    },
    services: {
        icon: <ListClipboardIcon />,
        route: 'f7'
    },
    roles: {
        icon: <DashboardIcon />,
        route: 'f8'
    },
    admins: {
        icon: <UserGroupIcon />,
        route: '/admins'
    },
    logs: {
        icon: <FileIcon />,
        route: '/logs'
    }
};