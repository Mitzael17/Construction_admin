import {createContext, Dispatch, SetStateAction} from "react";
import {ModalContextValues} from "../types/contexts/ModalContextValues";
export const modalContext = createContext<ModalContextValues>({});

export const modalChangeContext = createContext(((data: ModalContextValues) => {}) as Dispatch<SetStateAction<ModalContextValues>> );