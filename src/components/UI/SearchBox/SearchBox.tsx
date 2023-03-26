import React, {memo, useEffect, useRef} from 'react';
import {SearchBoxProps} from "../../../types/components/UIComponents";
import TinyInput from "../Input/TinyInput";
import classes from "./SearchBox.module.scss";
import Loading from "../../Visual/Loading";
import {useListForeignKeys} from "../../../hooks/useListForeignKeys";
import {BaseData} from "../../../types/API";

const SearchBox = memo((
    {
        setChosenValue,
        placeholder,
        chosenValue,
        table,
    }: SearchBoxProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const chosenId = Array.isArray(chosenValue) ? chosenValue.map( item => item.id) : [chosenValue.id];


    const [searchValue, setSearchValue, items, isLoading] = useListForeignKeys({table});

    useEffect( () => {

        if(!inputRef.current) return;

        inputRef.current.addEventListener('keydown', handleKeyDown);

        return () => {
            if(!inputRef.current) return;
            inputRef.current.removeEventListener('keydown', handleKeyDown);
        }


    }, [inputRef.current]);

    return (
        <div className={classes.searchBox} >
            <TinyInput ref={inputRef} placeholder={placeholder} value={searchValue} setValue={setSearchValue} />
            <ul className={`${classes.box} customScroll relative`}>
                {isLoading ? <div className='pos-abs-center'><Loading /></div> : <>
                    {items.map( item => (
                            <li
                                onClick={() => {


                                    if(!Array.isArray(chosenValue)) {

                                        //@ts-ignore
                                        setChosenValue(item);

                                        return;

                                    }

                                    //@ts-ignore
                                    setChosenValue((prev: BaseData[]) => {

                                        if(prev.find( value => value.id === item.id)) return prev.filter(value => value.id !== item.id);

                                        return [...prev, item];

                                    });


                                }}
                                className={`${classes.item} ${chosenId.indexOf(item.id) !== -1 ? classes.active : ''}`} key={item.id}
                            >
                                {item.name}
                            </li>
                        ))
                    }
                </>}

            </ul>
        </div>
    );

    function handleKeyDown(event: KeyboardEvent) {

        if(event.code === 'Enter') return false;

    }


});

export default SearchBox;