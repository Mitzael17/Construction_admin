
export interface NumbersSliderProps {
    quantity: number,
    initialSlide?: number,
    onChange?: (index: number) => void
}

export interface NumbersSlideProps {
    value: string,
    index: number

}