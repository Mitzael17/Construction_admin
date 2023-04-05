import React from 'react';
import SearchProvider from "../../../../components/Providers/SearchProvider";
import FiltersProjectsProvider from "./FiltersProjectsProvider";
import CheckedItemsProvider from "../../../../components/Providers/CheckedItemsProvider";
import ProjectsListProvider from "./ProjectsListProvider";
import SortProvider from "../../../../components/Providers/SortProvider";
import {DefaultSorts} from "../../../../types/contexts/SortContext";

const MainProjectsProvider = ({children}: {children: JSX.Element}) => {
    return (
        <SortProvider defaultValue={DefaultSorts.new}>
            <SearchProvider>
                <FiltersProjectsProvider>
                    <CheckedItemsProvider>
                        <ProjectsListProvider>
                            {children}
                        </ProjectsListProvider>
                    </CheckedItemsProvider>
                </FiltersProjectsProvider>
            </SearchProvider>
        </SortProvider>
    );
};

export default MainProjectsProvider;