import {createContext, Dispatch, SetStateAction} from "react";

export const BurgerContext = createContext(false);

export const BurgerChangeContext = createContext(function () {} as Dispatch<SetStateAction<boolean>>)