import React, {useEffect, useState} from 'react';
import {userContext, userChangeContext} from "../../context/userContext";
import {$getUser} from "../../api/usersAPI";
import {deleteCookie, getCookie} from "../../utils/cookie";
import jwtDecode from "jwt-decode";
import {DecodeTokenResult} from "../../types/API";
import Loading from "../Visual/Loading";
import {OwnUserAccount} from "../../types/API/usersAPI";
import defaultImageProfile from "../../assets/defaultProfile.png";


const UserProvider = ({children}: {children: any}) => {

    const [userData, setUserData] = useState({} as OwnUserAccount);

    const token = getCookie('token');

    if(!token) throw new Error('Token is invalid');

    const dataToken: DecodeTokenResult = jwtDecode(token);

    useEffect(() => {

        const setContextData = async () => {

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

        setContextData();

    }, [])

    return (
        <>
            {Object.keys(userData).length === 0 ? <Loading /> : (
                <userContext.Provider value={userData}>
                    <userChangeContext.Provider value={setUserData}>
                        {children}
                    </userChangeContext.Provider>
                </userContext.Provider>
            )}
        </>
    );
};

export default UserProvider;