import React, {FormEvent, useEffect, useRef, useState} from 'react';
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import {$login} from "../../../api/loginAPI";
import Loading from "../../../components/Loading";
import {CSSTransition, Transition} from "react-transition-group";
import {flushSync} from "react-dom";


const LoginForm = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [showError, setShowError] = useState(false);
    const error = useRef('');
    const nodeError = useRef(null);

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
                            <Input value={password} setValue={(value: string) => {

                                setPassword(value);
                                if(showError) setShowError(false);

                            }} placeholder='Password' />
                        </div>
                            <CSSTransition nodeRef={nodeError} unmountOnExit timeout={500} in={showError} className='error'>
                                <div ref={nodeError}>{error.current} <span onClick={() => setShowError(false)}></span></div>
                            </CSSTransition>
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

            document.location.href = '/';

            return;

        }

        error.current = data.message;

        flushSync(() => {
            setIsLoading(false)
        });

        setShowError(true);

    }

};

export default LoginForm;