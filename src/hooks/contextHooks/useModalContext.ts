import {Dispatch, SetStateAction, useContext} from "react";
import {ModalChangeContext, ModalContext} from "../../context/ModalContext";
import {ModalContextValues} from "../../types/contexts/ModalContextValues";

export const useModalContext = (): [ModalContextValues, Dispatch<SetStateAction<ModalContextValues>>] =>
    [useContext(ModalContext), useContext(ModalChangeContext)];