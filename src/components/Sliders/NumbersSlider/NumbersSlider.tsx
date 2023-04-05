import React, {memo} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {getNumbers} from "../../../utils/getNumbers";
import {NumbersSliderProps} from "../../../types/components/SlidersComponents";
import SwiperCore, {Mousewheel} from "swiper";
import 'swiper/css';

SwiperCore.use([Mousewheel]);


const NumbersSlider = memo(({quantity, initialSlide, onChange = undefined}: NumbersSliderProps) => {


    return (
        <Swiper
            className='numbersSlider'
            direction='vertical'
            slidesPerView={3}
            centeredSlides={true}
            mousewheel={true}
            loop={true}
            initialSlide={initialSlide}
            grabCursor={true}
            speed={500}
            onRealIndexChange={onChange}
        >
            {
                getNumbers(quantity).map( number => (
                    <SwiperSlide key={number}>
                        <div>{number}</div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
});

export default NumbersSlider;