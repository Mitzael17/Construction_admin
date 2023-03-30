import {createContext, Dispatch, SetStateAction} from "react";
import {ModalContextValues} from "../types/contexts/ModalContextValues";
export const ModalContext = createContext<ModalContextValues>({});

export const ModalChangeContext = createContext(((data: ModalContextValues) => {}) as Dispatch<SetStateAction<ModalContextValues>> );