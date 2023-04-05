import {SwiperProps} from "swiper/react";

export interface NumbersSliderProps {
    quantity: number,
    initialSlide?: number,
    onChange?: SwiperProps['onRealIndexChange']
}

export interface NumbersSlideProps {
    value: string,
    index: number

}