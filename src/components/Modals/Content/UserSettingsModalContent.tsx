import React, {FormEvent, useEffect, useRef, useState} from 'react';
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
import FileManager from "./FileManager/FileManager";
import {createPortal} from "react-dom";
import {useModal} from "../../../hooks/useModal";

const UserSettingsModalContent = () => {

    const userData = useUser();
    const changeData = useUserChange();

    const [modalData, setModalData] = useModal();

    const title = useRef(modalData['title']);

    const [name, setName] = useState(userData.name);
    const [password, setPassword] = useState(userData.password);
    const [image, setImage] = useState({
        inner_link: '',
        out_link: userData.image,
    });

    const [response, setResponse] = useState<null|PostResponse>(null);

    const [isLoading, setIsLoading] = useState(false);

    const [showFileManager, setShowFileManager] = useState(false);

    return (
        <>
            <form style={{display: (showFileManager ? 'none' : 'flex')}} onSubmit={handleSubmit} className='defaultForm' action='#'>
                <Input setValue={setName} placeholder='Name' value={name} />
                <InputPassword placeholder='Password' value={password} setValue={setPassword} />
                <Button type='submit'>Save</Button>
                <Button onClick={() => setShowFileManager(true)}>Open file manager</Button>
                {response && !isLoading && <StatusResponse status={response.status} />}
                {isLoading && <Loading />}
            </form>
            {showFileManager && <FileManager prevTitle={title.current} setVisible={setShowFileManager} setImage={setImage} />}
        </>
    );

    async function handleSubmit(event: FormEvent) {

        event.preventDefault();


        let newUserData: UserUpdateData = {name, password, image: image.inner_link};

        for(let key in newUserData) {

            const oldValue = userData[key as keyof OwnUserAccount];
            const newValue = newUserData[key as keyof UserUpdateData];

            if(key === 'image' && image.out_link === userData.image) delete newUserData[key as keyof UserUpdateData];

            if(newValue === oldValue) delete newUserData[key as keyof UserUpdateData];

        }

        if(Object.keys(newUserData).length === 0) {

            return;

        }

        setIsLoading(true);

        // const modalWindow: HTMLElement|null = (event.target as HTMLFormElement).closest(`.${modalClass}`);
        //
        // if(modalWindow) {
        //
        //     modalWindow.classList.remove('success-background');
        //     modalWindow.classList.remove('error-background');
        //     modalWindow.classList.remove('warning-background');
        //
        // }


        const result = await $updateUser(userData.id, newUserData);

        if(result.status === 'success') {

            const data = await $login(name, password);

            if(data.status === 'success') {

                if(newUserData.image) newUserData.image = image.out_link;

                changeData({...userData, ...newUserData});
                setIsLoading(false);

                setModalData({...modalData, class: 'success-background'})

                setResponse({status: Statuses.success});

                return;

            }

        }

        setIsLoading(false);

        setModalData({...modalData, class: `${result.status}-background`})

        setResponse(result);


    }

};

export default UserSettingsModalContent;