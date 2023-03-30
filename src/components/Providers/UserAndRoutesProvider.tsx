import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {UserChangeContext, UserContext} from "../../context/UserContext";
import {$getUser} from "../../api/usersAPI";
import {deleteCookie, getCookie} from "../../utils/cookie";
import jwtDecode from "jwt-decode";
import {DecodeTokenResult} from "../../types/API";
import Loading from "../Visual/Loading";
import {OwnUserAccount} from "../../types/API/usersAPI";
import defaultImageProfile from "../../assets/defaultProfile.png";
import {$getRoutesAndSidebar} from "../../api/routeAPI";
import {RouteResponse} from "../../types/API/routes";
import { RoutesContext } from '../../context/RoutesContext';


const UserAndRoutesProvider = ({children}: {children: any}) => {

    const [userData, setUserData] = useState<null|OwnUserAccount>(null);
    const [routeData, setRouteData] = useState<null|RouteResponse>(null);

    const token = getCookie('token');

    if(!token) throw new Error('Token is invalid');

    const dataToken: DecodeTokenResult = jwtDecode(token);

    useEffect(() => {

        const setContextUserData = async () => {

            const id = dataToken.data.id;

            const data = await $getUser(id);

            if(Object.keys(data).length > 0) {

                if(!data.image) data.image = defaultImageProfile;

                if(!data.password) {
                    deleteCookie('token');
                    throw new Error('Access denied');
                }

                setUserData(data);

            }

        }

        const setContextRouteData = async () => {

            const data = await $getRoutesAndSidebar();

            if('status' in data) {
                alert('error');
                throw new Error('Internal error');
            }

            setRouteData(data);

        }

        Promise.all([setContextUserData(), setContextRouteData()]);

    }, [])

    return (
        <>
            {!userData || !routeData ? <Loading /> : (
                <UserContext.Provider value={userData}>
                    <UserChangeContext.Provider value={setUserData as Dispatch<SetStateAction<OwnUserAccount>>}>
                        <RoutesContext.Provider value={routeData}>
                            {children}
                        </RoutesContext.Provider>
                    </UserChangeContext.Provider>
                </UserContext.Provider>
            )}
        </>
    );
};

export default UserAndRoutesProvider;