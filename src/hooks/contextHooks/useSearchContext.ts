import {Dispatch, SetStateAction, useContext} from "react";
import {SearchChangeContext, SearchContext} from "../../context/SearchContext";

export const useSearchContext: () => [string, Dispatch<SetStateAction<string>>]
    = () => [useContext(SearchContext), useContext(SearchChangeContext)];