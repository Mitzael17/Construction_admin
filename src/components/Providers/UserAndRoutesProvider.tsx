import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {userChangeContext, userContext} from "../../context/userContext";
import {$getUser} from "../../api/usersAPI";
import {deleteCookie, getCookie} from "../../utils/cookie";
import jwtDecode from "jwt-decode";
import {DecodeTokenResult} from "../../types/API";
import Loading from "../Visual/Loading";
import {OwnUserAccount} from "../../types/API/usersAPI";
import defaultImageProfile from "../../assets/defaultProfile.png";
import {$getRoutesAndSidebar} from "../../api/routeAPI";
import {RouteResponse} from "../../types/API/routes";
import { routesContext } from '../../context/routesContext';


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

        setContextUserData();
        setContextRouteData();

    }, [])

    return (
        <>
            {!userData || !routeData ? <Loading /> : (
                <userContext.Provider value={userData}>
                    <userChangeContext.Provider value={setUserData as Dispatch<SetStateAction<OwnUserAccount>>}>
                        <routesContext.Provider value={routeData}>
                            {children}
                        </routesContext.Provider>
                    </userChangeContext.Provider>
                </userContext.Provider>
            )}
        </>
    );
};

export default UserAndRoutesProvider;