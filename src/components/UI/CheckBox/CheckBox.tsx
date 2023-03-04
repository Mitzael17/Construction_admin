import React, {memo} from 'react';
import {CheckBoxProps} from "../../../types/components/UIComponents";

const CheckBox = memo(({onChange, name = '', placeholder = ''}: CheckBoxProps) => {

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