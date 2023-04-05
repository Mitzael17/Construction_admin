import React from 'react';
import SearchProvider from "../../../../components/Providers/SearchProvider";
import LogsListProvider from "./LogsListProvider";
import DateProvider from "../../../../components/Providers/DateProvider";
import SortProvider from "../../../../components/Providers/SortProvider";
import {DefaultSorts} from "../../../../types/contexts/SortContext";

const MainLogsProvider = ({children}: {children: JSX.Element}) => {

    return (
        <DateProvider>
            <SortProvider defaultValue={DefaultSorts.new}>
                <SearchProvider>
                    <LogsListProvider>
                        {children}
                    </LogsListProvider>
                </SearchProvider>
            </SortProvider>
        </DateProvider>
    );
};

export default MainLogsProvider;