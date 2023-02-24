import React, {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import {$login} from "../../../api/loginAPI";
import Loading from "../../../components/Loading";
import {flushSync} from "react-dom";
import Error from "../../../components/Messages/Error";
import {PROJECTS_ROUTE} from "../../../data/paths";
import InputPassword from "../../../components/UI/Input/InputPassword";


const LoginForm = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [showError, setShowError] = useState(false);
    const error = useRef('');

    return (
        <div className='loginForm'>
            <form onSubmit={handleSubmit} action="#">
                <h2 className='loginForm__title'>Authorization</h2>
                {isLoading ?
                    <Loading/> : (
                    <>
                        <div className="loginForm__inputs">
                            <Input setValue={(value: string) => {

                                setLogin(value);
                                if(showError) setShowError(false);

                            }} placeholder='Login' value={login} />
                            {<InputPassword value={password} setValue={(value: string) => {

                                setPassword(value);
                                if(showError) setShowError(false);

                            }} placeholder='Password' />}
                        </div>
                        <Error value={showError} setValue={setShowError}>{error.current}</Error>
                        <div className="loginForm__button">
                            <Button>Send</Button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );

    async function handleSubmit(event: FormEvent) {

        event.preventDefault();

        if(!login || !password) {
            error.current = 'You must write login and password!';
            setShowError(true);
            return false;
        }

        setIsLoading(true);

        const data = await $login(login, password);

        if(data.status === 'success') {

            document.location.href = PROJECTS_ROUTE;

            return;

        }

        flushSync(() => {
            setIsLoading(false)
        });

        error.current = data.message;

        setShowError(true);

    }

};

export default LoginForm;