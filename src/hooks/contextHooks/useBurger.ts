import {Dispatch, SetStateAction, useContext} from "react";
import {BurgerChangeContext, BurgerContext} from "../../context/BurgerContext";

export const useBurger = (): [boolean, Dispatch<SetStateAction<boolean>>] =>
    [useContext(BurgerContext), useContext(BurgerChangeContext)];