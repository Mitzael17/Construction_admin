import {Dispatch, SetStateAction, useContext} from "react";
import {modalChangeContext, modalContext} from "../context/modalContext";
import {ModalContextValues} from "../types/contexts/ModalContextValues";

export const useModal = (): [ModalContextValues, Dispatch<SetStateAction<ModalContextValues>>] => [useContext(modalContext), (function() { return useContext(modalChangeContext)})()];