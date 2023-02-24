import {stateProps} from "./index";
import {LegacyRef, MutableRefObject, Ref} from "react";

export interface ErrorProps extends stateProps<boolean> {

    children: string

}