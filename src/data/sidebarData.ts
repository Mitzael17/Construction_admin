import project_icon from '../assets/icons/Box.svg'
import messages_icon from '../assets/icons/Email.svg'
import clients_icon from '../assets/icons/User Group.svg';
import partners_icon from '../assets/icons/Suitcase 1.svg';
import testimonials_icon from '../assets/icons/Thumbs Up.svg';
import news_icon from '../assets/icons/Clipboard.svg';
import layouts_icon from '../assets/icons/Layout 2.svg';
import list_icon from '../assets/icons/Chevron Down.svg';
import contacts_icon from '../assets/icons/Headset Mic 1.svg';
import subscribers_icon from '../assets/icons/Share 3.svg';
import services_icon from '../assets/icons/List Clipboard.svg';
import roles_icon from '../assets/icons/Dashboard 1.svg';
import logs_icon from '../assets/icons/File.svg';
import {CLIENTS_ROUTE, MESSAGES_ROUTE, PROJECTS_ROUTE} from "./paths";


export const sidebarData = {
    projects: {
        icon: project_icon,
        route: PROJECTS_ROUTE
    },
    messages: {
      icon: messages_icon,
      route: MESSAGES_ROUTE
    },
    clients: {
        icon: clients_icon,
        route: CLIENTS_ROUTE
    },
    'pages content': {
        icon: list_icon,
        route: ''
    },
    partners: {
        icon: partners_icon,
        route: 'f1'
    },
    testimonials: {
        icon: testimonials_icon,
        route: 'f2'
    },
    layouts: {
        icon: layouts_icon,
        route: 'f3'
    },
    news: {
        icon: news_icon,
        route: 'f4'
    },
    contacts: {
        icon: contacts_icon,
        route: 'f5'
    },
    'other data': {
        icon: list_icon,
        route: ''
    },
    subscribers: {
        icon: subscribers_icon,
        route: 'f6'
    },
    services: {
        icon: services_icon,
        route: 'f7'
    },
    roles: {
        icon: roles_icon,
        route: 'f8'
    },
    admins: {
        icon: clients_icon,
        route: '/admins'
    },
    logs: {
        icon: logs_icon,
        route: '/logs'
    }
};