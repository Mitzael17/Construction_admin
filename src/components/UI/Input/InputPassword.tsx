import React, {memo, useState} from 'react';
import classes from './Input.module.scss';
import {InputProps} from "../../../types/components/UIComponents";
import Input from "./Input";
import Eye from "../../../assets/icons/Eye.svg";
import Eye_off from "../../../assets/icons/Eye Off.svg";

const InputPassword = memo(({value, setValue, placeholder}: InputProps) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={classes.password_input_container}>
            <Input type={showPassword ? 'text' : 'password'} placeholder={placeholder} value={value} setValue={setValue} />
            <img onClick={() => setShowPassword( prev=> !prev)} className={classes.eye_icon} src={showPassword ? Eye_off : Eye} />
        </div>
    );

});

export default InputPassword;