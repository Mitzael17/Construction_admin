export interface SidebarLink {

    name: string,
    link: string,
    icon: string

}

export interface SidebarList extends Omit<SidebarLink, 'link'>{
    values: SidebarLink[]

}

export type SidebarStructure = (SidebarLink|SidebarList)[];

