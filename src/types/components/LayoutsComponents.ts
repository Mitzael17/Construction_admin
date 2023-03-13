export interface SidebarLink {

    name: string,
    link: string,
    icon: JSX.Element

}

export interface SidebarList extends Omit<SidebarLink, 'link'>{
    values: SidebarLink[]

}

export type SidebarStructure = (SidebarLink|SidebarList)[];

