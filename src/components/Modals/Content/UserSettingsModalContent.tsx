import React, {FormEvent, useState} from 'react';
import {useUser} from "../../../hooks/useUser";
import Input from "../../UI/Input/Input";
import InputPassword from "../../UI/Input/InputPassword";
import {$login, $updateUser} from "../../../api/usersAPI";
import {useUserChange} from "../../../hooks/useUserChange";
import Button from "../../UI/Button/Button";
import {OwnUserAccount, UserUpdateData} from "../../../types/API/usersAPI";
import Loading from "../../Visual/Loading";
import {modal as modalClass} from "../Modals.module.scss";
import {PostResponse, Statuses} from "../../../types/API";
import StatusResponse from "../../Visual/StatusResponse";

const UserSettingsModalContent = () => {

    const userData = useUser();
    const changeData = useUserChange();

    const [name, setName] = useState(userData.name);
    const [password, setPassword] = useState(userData.password);

    const [response, setResponse] = useState({} as PostResponse);

    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <form onSubmit={handleSubmit} className='defaultForm' action='#'>
                <Input setValue={setName} placeholder='Name' value={name} />
                <InputPassword placeholder='Password' value={password} setValue={setPassword} />
                <Button>Save</Button>
                {Object.keys(response).length > 0 && !isLoading && <StatusResponse status={response.status} />}
                {isLoading && <Loading />}
            </form>
        </>
    );

    async function handleSubmit(event: FormEvent) {

        event.preventDefault();


        let newUserData: UserUpdateData = {name, password};

        for(let key in newUserData) {

            const oldValue = userData[key as keyof OwnUserAccount];
            const newValue = newUserData[key as keyof UserUpdateData];


            if(newValue === oldValue) delete newUserData[key as keyof UserUpdateData];

        }

        if(Object.keys(newUserData).length === 0) {

            return;

        }


        setIsLoading(true);


        const modalWindow: HTMLElement|null = (event.target as HTMLFormElement).closest(`.${modalClass}`);

        if(modalWindow) {

            modalWindow.classList.remove('success-background');
            modalWindow.classList.remove('error-background');
            modalWindow.classList.remove('warning-background');

        }


        const result = await $updateUser(userData.id, newUserData);

        if(result.status === 'success') {

            const data = await $login(name, password);

            if(data.status === 'success') {

                changeData({...userData, ...newUserData});
                setIsLoading(false);

                if(modalWindow) modalWindow.classList.add('success-background');

                setResponse({status: Statuses.success});

                return;

            }

        }

        setIsLoading(false);

        if(modalWindow) {

            modalWindow.classList.add(`${result.status}-background`);

            setResponse(result);

        }


    }

};

export default UserSettingsModalContent;