import React, {useReducer} from 'react';
import {CheckedItemsActions, ReducerTypes} from "../../types";
import {CheckedItemsChangeContext, CheckedItemsContext} from "../../context/CheckedItemsContext";

const CheckedItemsProvider = ({children}: {children: JSX.Element}) => {

    const [items, dispatch] = useReducer(reducerCheckedProjects, []);

    return (
        <CheckedItemsContext.Provider value={items}>
            <CheckedItemsChangeContext.Provider value={dispatch}>
                {children}
            </CheckedItemsChangeContext.Provider>
        </CheckedItemsContext.Provider>
    );

    function reducerCheckedProjects(state: string[], action: CheckedItemsActions) {

        switch (action.type) {

            case ReducerTypes.Add: {

                return [...state, action.payload];

            }
            case ReducerTypes.Delete: {

                return state.filter(item => item !== action.payload);

            }
            case ReducerTypes.Reset: {

                return [];

            }

        }

    }

};

export default CheckedItemsProvider;