import React, {useCallback, useRef} from 'react';
import SwiperCore from "swiper";
import {TimeBlockProps} from "../../../types/components/UIComponents";
import Clock from "../../Visual/Clock/Clock";
import NumbersSlider from "../../Sliders/NumbersSlider/NumbersSlider";
import classes from "./TimeBlock.module.scss";

const TimeBlock = ({date = new Date(), setDate}: TimeBlockProps) => {

    const changeHours = useCallback( (swiper: SwiperCore) => {

        setDate(prevDate => {

            if(swiper.realIndex === undefined) return prevDate;

            return new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate(), swiper.realIndex, prevDate.getMinutes(), prevDate.getSeconds());

        });

    }, []);

    const changeMinutes = useCallback( (swiper: SwiperCore) => {

        setDate(prevDate => {

            if(swiper.realIndex === undefined) return prevDate;

            return new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate(), prevDate.getHours(), swiper.realIndex, prevDate.getSeconds());

        });

    }, []);

    const changeSeconds = useCallback( (swiper: SwiperCore) => {

        setDate(prevDate => {

            if(swiper.realIndex === undefined) return prevDate;

            return new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate(), prevDate.getHours(), prevDate.getMinutes(), swiper.realIndex);

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