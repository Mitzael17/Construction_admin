import {Dispatch, SetStateAction, useContext} from "react";
import {BurgerChangeContext, BurgerContext} from "../../context/BurgerContext";

export const useBurgerContext = (): [boolean, Dispatch<SetStateAction<boolean>>] =>
    [useContext(BurgerContext), useContext(BurgerChangeContext)];