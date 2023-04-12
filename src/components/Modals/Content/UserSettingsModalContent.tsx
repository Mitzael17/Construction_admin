import React, {FormEvent, useMemo, useRef, useState} from 'react';
import {useUserContext} from "../../../hooks/contextHooks/useUserContext";
import Input from "../../UI/Input/Input";
import InputPassword from "../../UI/Input/InputPassword";
import {$checkUserName, $login, $updateUser} from "../../../api/usersAPI";
import Button from "../../UI/Button/Button";
import Loading from "../../Visual/Loading";
import {PostResponse, Statuses} from "../../../types/API";
import StatusResponse from "../../Visual/StatusResponse";
import FileManager from "./FileManager/FileManager";
import {useModalContext} from "../../../hooks/contextHooks/useModalContext";
import {useFilterDuplicatedData} from "../../../hooks/useFilterDuplicatedData";
import ProfileLogo from "../../ProfileLogo";
import Error from "../../Messages/Error";
import {useValidation} from "../../../hooks/useValidation";
import {UseValidation} from "../../../types/hooks";
import {useStateCallback} from "../../../hooks/useStateCallback";
import {getError} from "../../../utils/getError";

const UserSettingsModalContent = () => {

    // Context data
    const [userData, setUserData] = useUserContext();
    const [modalData, setModalData] = useModalContext();

    // Saving an initial title of the modal window
    const title = useRef(modalData['title']);

    const [response, setResponse] = useState<null|PostResponse>(null);
    const [isLoading, setIsLoading] = useState(false);

    // reset response and remove modal classes
    const callback = (value: string) => {

        if(response) {

            setModalData(prevData => ({
                ...prevData,
                class: undefined,
            }));
            setResponse(null);
        }

        return value;

    }

    // inputs data
    const [name, setName] = useStateCallback(userData.name, callback, [response]);
    const [password, setPassword] = useStateCallback(userData.password, callback, [response]);

    const [image, setImage] = useState({
        inner_link: '',
        out_link: userData.image,
    });

    const [showFileManager, setShowFileManager] = useState(false);

    // skip repeating values
    const [newUserData, setInitialData] = useFilterDuplicatedData(
{
            name: userData.name,
            password: userData.password,
            image: userData.image
        },
{
            name,
            password,
            image: image.out_link
        }
    );

    // memorizing options to avoid infinite rendering in the useValidation hook
    const validationOptions = useMemo<UseValidation[]>(() => ([
        {name: 'name', value: name, min: 1, max: 50, callbackChecker: async(value) => {

            const response = await $checkUserName(value);

            if(response.status === Statuses.success) return {isValid: true, message: ''};

            return {isValid: false, message: response.message};

        }},
        {name: 'password', value: password, min: 1, max: 50}
    ]), [name, password]);

    const [errors, isLoadingValidation] = useValidation(validationOptions);

    // checking for errors
    const nameError = getError(errors, 'name');
    const passwordError = getError(errors, 'password');

    const isAvailableToSubmit = Object.keys(newUserData).length > 0 && !errors.length && !isLoadingValidation;

    return (
        <>
            <form autoComplete='off' style={{display: (showFileManager ? 'none' : 'flex')}} onSubmit={handleSubmit} className='defaultForm' action='#'>
                <div className={`${nameError ? 'error-input' : ''}`}>
                    <Input setValue={setName} placeholder='Name' value={name} />
                    <Error value={!!nameError}>{nameError ? nameError.message : ''}</Error>
                </div>
                <div className={`${passwordError ? 'error-input' : ''}`}>
                    <InputPassword placeholder='Password' value={password} setValue={setPassword} />
                    <Error value={!!passwordError}>{passwordError ? passwordError.message : ''}</Error>
                </div>
                <div className='flex profileSettingsLogo'>
                    <div className='profileSettingsLogo__image'>
                        <ProfileLogo src={image.out_link ?? userData.image} />
                    </div>
                    <div className='ml-20px profileSettingsLogo__button'>
                        <Button onClick={() => {
                            setShowFileManager(true);
                            setResponse(null);
                        }}>Change logo</Button>
                    </div>
                </div>
                <Button
                    disabled={!isAvailableToSubmit || isLoading}
                    type='submit'
                >
                    {isLoadingValidation ? <Loading showText={false} diameter={20} /> : 'Save'}
                </Button>
                {response && !isLoading && <StatusResponse response={response} />}
                {isLoading && <Loading />}
            </form>
            {showFileManager && <FileManager prevTitle={title.current} setVisible={setShowFileManager} setFile={setImage} />}
        </>
    );

    async function handleSubmit(event: FormEvent) {

        event.preventDefault();

        if(!isAvailableToSubmit || isLoading) return;

        setIsLoading(true);

        // rewrite image parameter
        const {image: _, ...data} = newUserData;
        if(image.inner_link) data.image = image.inner_link;

        const result = await $updateUser(userData.id, data);

        if(result.status === 'success') {

            const data = await $login(name, password);

            if(data.status === 'success') {

                if(newUserData.image) newUserData.image = image.out_link;

                setUserData(prevData => ({...prevData, ...newUserData}));

                setIsLoading(false);

                setModalData({...modalData, class: 'success-background'})

                setResponse({status: Statuses.success});

                setInitialData(prevData => ({...prevData, ...newUserData}));

                return;

            }

            alert('error');

        }

        setIsLoading(false);

        setModalData({...modalData, class: `${result.status}-background`})

        setResponse(result);


    }

};

export default UserSettingsModalContent;