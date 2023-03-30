import React, {memo, useEffect, useRef} from 'react';
import {CheckBoxProps} from "../../../types/components/UIComponents";
import classes from "./CheckBox.module.scss";

const CheckBox = memo(({onChange, name = '', placeholder = '', checked = false}: CheckBoxProps) => {

    const nodeRef = useRef<HTMLInputElement>(null);

    useEffect( () => {

        if(nodeRef.current) nodeRef.current.checked = checked;

    });

    return (
        <label onClick={ event => event.stopPropagation()} className='flex flex-a-c pointer-cursor'>
            <div className={classes.checkbox}>
                <input ref={nodeRef} onChange={onChange} type="checkbox" name={name} />
                <span></span>
            </div>
            {placeholder && (
                <div className='ml-10px'>{placeholder}</div>
            )}
        </label>

    );
});

export default CheckBox;