import React, {memo, useState} from 'react';
import classes from './Input.module.scss';
import {InputProps} from "../../../types/components/UIComponents";
import Input from "./Input";
import EyeOffIcon from "../../Icons/KalaiIcons/EyeOffIcon";
import EyeIcon from "../../Icons/KalaiIcons/EyeIcon";


const InputPassword = memo(({value, setValue, placeholder}: InputProps) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={classes.password_input_container}>
            <Input type={showPassword ? 'text' : 'password'} placeholder={placeholder} value={value} setValue={setValue} />
            <div className={classes.eye_icon} onClick={() => setShowPassword(prev => !prev)}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </div>
        </div>
    );

});

export default InputPassword;