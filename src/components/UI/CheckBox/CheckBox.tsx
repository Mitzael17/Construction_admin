import React, {memo, useEffect, useRef} from 'react';
import {CheckBoxProps} from "../../../types/components/UIComponents";

const CheckBox = memo(({onChange, name = '', placeholder = '', checked = false}: CheckBoxProps) => {

    const nodeRef = useRef<HTMLInputElement>(null);

    useEffect( () => {

        if(checked && nodeRef.current) nodeRef.current.checked = true;

    }, []);

    return (
        <label className='flex flex-a-c checkbox-label'>
            <div onClick={ event => event.stopPropagation()} className='checkbox'>
                <input onChange={onChange} type="checkbox" name={name} />
                <span></span>
            </div>
            {placeholder && (
                <div className='ml-10'>{placeholder}</div>
            )}
        </label>

    );
});

export default CheckBox;