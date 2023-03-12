import React from 'react';
import {useInternalRoutes} from "../hooks/useInternalRoutes";
import {sidebarData} from "../data/sidebarData";
import {SidebarLink, SidebarStructure} from "../types/components/LayoutsComponents";
import {NavLink} from "react-router-dom";

const Sidebar = () => {

    const links = useInternalRoutes().sidebar;

    const structure: SidebarStructure = [];

    for(let alias of links) {

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
        <div className="sidebar">
            <div className="sidebarCube">
                <div className='sidebarCube__container'>
                    <div className='sidebarCube__top sidebarCube__side'></div>
                    <div className='sidebarCube__bottom sidebarCube__side'></div>
                    <div className='sidebarCube__left sidebarCube__side'></div>
                    <div className='sidebarCube__right sidebarCube__side'></div>
                    <div className='sidebarCube__front sidebarCube__side'></div>
                    <div className='sidebarCube__back sidebarCube__side'></div>
                </div>
            </div>
            <nav className='sidebar__list'>
                {structure.map( item => {

                    if('values' in item) {

                        return (
                          <div onClick={toggleList} key={item.name} className='sidebar__list sidebarList sidebar__item'>
                              <div className='pointer-cursor flex sidebarList__title'>
                                  <img src={item.icon} alt='' />
                                  <span>{item.name}</span>
                              </div>
                              <div onTransitionEnd={handleTransitionEnd} className="sidebarList__wrapper">
                                  <ul className='sidebarList__list'>
                                      {item.values.map( sub_item => (
                                          <li className='sidebar__item' key={sub_item.name}>
                                              <NavLink to={sub_item.link} >
                                                  <div className='flex'>
                                                      <img src={sub_item.icon} alt='' />
                                                      <span>{sub_item.name}</span>
                                                  </div>
                                              </NavLink>
                                          </li>
                                      ))}
                                  </ul>
                              </div>
                          </div>
                        );

                    }

                    return <div className='sidebar__item' key={item.name}>
                        <NavLink to={item.link} >
                            <div className='flex'>
                                <img src={item.icon} alt='' />
                                <span>{item.name}</span>
                            </div>
                        </NavLink>
                    </div>

                })}
            </nav>
        </div>
    );


    function toggleList(event: React.MouseEvent<HTMLDivElement>) {

        if((event.target as HTMLDivElement).closest('.sidebarList__wrapper') &&
            !(event.target as HTMLDivElement).closest('a')) return;

        const list = event.currentTarget.querySelector('.sidebarList__wrapper') as HTMLDivElement;

        list.dataset.heightTranstion = 'true';

        if(event.currentTarget.classList.contains('active-list')) {

            event.currentTarget.classList.remove('active-list');
            list.style.height = list.offsetHeight + 'px';

            setTimeout(() => {
                list.style.height = '0px';
            }, 20);

        }
        else {

            event.currentTarget.classList.add('active-list');
            list.style.height = list.scrollHeight + 'px';

        }

    }

    function handleTransitionEnd(event: React.TransitionEvent<HTMLDivElement>) {

        if(!event.currentTarget.dataset.heightTransition) return;

        event.currentTarget.dataset.heightTransition = undefined;

        if(!(event.currentTarget.closest('.sidebarList') as HTMLDivElement).classList.contains('active-list')) return;

        event.currentTarget.style.height = 'auto';

    }

};

export default Sidebar;