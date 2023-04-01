import React from 'react';
import {useInternalRoutes} from "../hooks/contextHooks/useInternalRoutes";
import {sidebarData} from "../data/sidebarData";
import {SidebarLink, SidebarStructure} from "../types/components/LayoutsComponents";
import {NavLink} from "react-router-dom";
import Spoiler from "../components/UI/Spoiler/Spoiler";
import Cube3D from "../components/Visual/Cube3D/Cube3D";
import {useBurger} from "../hooks/contextHooks/useBurger";

const Sidebar = () => {

    const links = useInternalRoutes().sidebar;

    const [isOpen, setIsOpen] = useBurger();

    const structure: SidebarStructure = [];

    // The filter skip links, which are not available for user
    for(let alias of links) {

        // if alias is an object, then it is a list (spoiler)
        if(typeof alias === 'object') {

            let bufferList: SidebarLink[] = [];

            if(!(alias.name in sidebarData)) {

                console.log(`${alias.name} is absent in routes`);

                continue
            }

            alias.values.forEach( list_alias => {

                if(!(list_alias in sidebarData)) {

                    console.log(`${list_alias} is absent in routes`);

                    return;

                }

                bufferList.push({
                    name: list_alias,
                    link: sidebarData[list_alias as keyof typeof sidebarData].route,
                    icon: sidebarData[list_alias as keyof typeof sidebarData].icon
                });

            })

            if(!bufferList.length) continue;

            structure.push({
                name: alias.name,
                values: bufferList,
                icon: sidebarData[alias.name as keyof typeof sidebarData].icon
            })

            continue;

        }

        if(!(alias in sidebarData)) {

            console.log(`${alias} is absent in routes`);

            continue;

        }

        structure.push({
            name: alias,
            link: sidebarData[alias as keyof typeof sidebarData].route,
            icon: sidebarData[alias as keyof typeof sidebarData].icon,
        });

    }

    return (
        <div className={`sidebar ${isOpen ? 'active' : ''}`}>
            <div className="sidebar__wrapper">
                <Cube3D />
                <nav className='sidebar__list'>
                    {structure.map( item => {

                        if('values' in item) {

                            return (
                                <Spoiler
                                    key={item.name}
                                    title={
                                        <>
                                            {item.icon}
                                            <span>{item.name}</span>
                                        </>
                                    }
                                    items={
                                        <ul className='spoilerList__list'>
                                            {item.values.map( sub_item => (
                                                <li className='sidebar__item' key={sub_item.name}>
                                                    <NavLink to={sub_item.link} onClick={() => setIsOpen(false)} >
                                                        <div className='flex'>
                                                            {sub_item.icon}
                                                            <span>{sub_item.name}</span>
                                                        </div>
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </ul>
                                    }
                                />
                            );
                        }

                        return <div className='sidebar__item' key={item.name}>
                            <NavLink to={item.link} onClick={() => setIsOpen(false)}>
                                <div className='flex'>
                                    {item.icon}
                                    <span>{item.name}</span>
                                </div>
                            </NavLink>
                        </div>

                    })}
                </nav>
            </div>
        </div>
    );


};

export default Sidebar;