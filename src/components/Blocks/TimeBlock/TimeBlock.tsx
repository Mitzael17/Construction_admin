import React, {useCallback, useRef} from 'react';
import Clock from "../../Visual/Clock/Clock";
import NumbersSlider from "../../Sliders/NumbersSlider/NumbersSlider";
import classes from "./TimeBlock.module.scss";
import {TimeBlockProps} from "../../../types/components/Blocks";

const TimeBlock = ({date = new Date(), setDate}: TimeBlockProps) => {

    const changeHours = useCallback( (index: number) => {

        setDate(prevDate => {

            return new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate(), index, prevDate.getMinutes(), prevDate.getSeconds());

        });

    }, []);

    const changeMinutes = useCallback( (index: number) => {

        setDate(prevDate => {

            return new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate(), prevDate.getHours(), index, prevDate.getSeconds());

        });

    }, []);

    const changeSeconds = useCallback( (index: number) => {

        setDate(prevDate => {

            return new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate(), prevDate.getHours(), prevDate.getMinutes(), index);

        });

    }, []);


    const initialHour = useRef(date.getHours());
    const initialMinute = useRef(date.getMinutes());
    const initialSecond = useRef(date.getSeconds());


    return (
        <>
            <div className={`flex flex-j-c gap-30px ${classes.container}`}>
                <div>
                    <NumbersSlider quantity={23} initialSlide={initialHour.current} onChange={changeHours} />
                </div>
                <div>
                    <NumbersSlider quantity={59} initialSlide={initialMinute.current} onChange={changeMinutes} />
                </div>
                <div>
                    <NumbersSlider quantity={59} initialSlide={initialSecond.current} onChange={changeSeconds} />
                </div>
            </div>
            <div className='w-40 center-x mt-20px'>
                <Clock date={date} />
            </div>
        </>
    );


};

export default TimeBlock;