import React, {FormEvent, useRef, useState} from 'react';
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import {$login} from "../../../api/usersAPI";
import Loading from "../../../components/Visual/Loading";
import {flushSync} from "react-dom";
import Error from "../../../components/Messages/Error";
import {PROJECTS_ROUTE} from "../../../data/paths";
import InputPassword from "../../../components/UI/Input/InputPassword";
import {useStateCallback} from "../../../hooks/useStateCallback";


const LoginForm = () => {

    const callbackStates = (state: string) => {

        if(showError) setShowError(false);

        return state;

    }

    const [login, setLogin] = useStateCallback('', callbackStates);
    const [password, setPassword] = useStateCallback('', callbackStates);

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
                            <Input setValue={setLogin} placeholder='Login' value={login} />
                            <InputPassword value={password} setValue={setPassword} placeholder='Password' />
                        </div>
                        <Error value={showError} setValue={setShowError}>{error.current}</Error>
                        <div className="loginForm__button">
                            <Button type='submit'>Send</Button>
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

        setShowError(false);
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