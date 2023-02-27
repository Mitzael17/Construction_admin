import React from 'react';
import {SearchInputProps} from "../../../types/components/UIComponents";
import SearchIcon from "../../Icons/KalaiIcons/SearchIcon";
import TinyInput from "./TinyInput";

const SearchInput = ({value, setValue, placeholder, onClick}: SearchInputProps) => {
    return (
        <div className='flex w-100'>
            <TinyInput placeholder={placeholder} value={value} setValue={setValue} />
            <div onClick={onClick} className='kalaiIconDark'><SearchIcon /></div>
        </div>
    );
};

export default SearchInput;