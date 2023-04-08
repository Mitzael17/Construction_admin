import React, {memo} from 'react';
import {FiltersBlockProps} from "../../../types/components/Blocks";
import {isEqual} from "../../../utils/isEqual";
import {useGeneratorId} from "../../../hooks/useGeneratorId";
import classes from "./FiltersBlock.module.scss";
import TinyButton from "../../UI/Button/TinyButton";
import {useHeightTransition} from "../../../hooks/useHeightTransition";


const FiltersBlock = memo(({values}: FiltersBlockProps) => {

    const getId = useGeneratorId();

    const [isOpen, setIsOpen, nodeRef] = useHeightTransition();

    const activeFilters = values.filter( item => !isEqual(item.valueToSet, item.value));

    if(activeFilters.length > 0 && !isOpen) setIsOpen(true);
    if(activeFilters.length === 0 && isOpen) setIsOpen(false);


    return (
        <div ref={nodeRef}>
            <div className={`${isOpen ? classes.active : ''} ${classes.block}`}>
                <div className='w-150px mb-15px'>
                    <TinyButton onClick={clearFilters}>Clear all</TinyButton>
                </div>
                <div className={`flex gap-30px flex-wrap ${classes.filters}`}>
                    {activeFilters.map( (value) => (
                        <div className='flex' key={getId()}>
                            {value.displayedValue}
                            <div
                                onClick={() => value.setValue(value.valueToSet)}
                                className='deleteIcon ml-10px'>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    function clearFilters() {

        values.forEach( ({setValue, valueToSet}) => {

            setValue(valueToSet);

        })

    }

});

export default FiltersBlock;