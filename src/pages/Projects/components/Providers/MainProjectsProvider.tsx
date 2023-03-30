import React from 'react';
import SortProjectsProvider from "./SortProjectsProvider";
import SearchProvider from "../../../../components/Providers/SearchProvider";
import FiltersProjectsProvider from "./FiltersProjectsProvider";
import CheckedItemsProvider from "../../../../components/Providers/CheckedItemsProvider";
import ProjectsListProvider from "./ProjectsListProvider";

const MainProjectsProvider = ({children}: {children: JSX.Element}) => {
    return (
        <SortProjectsProvider>
            <SearchProvider>
                <FiltersProjectsProvider>
                    <CheckedItemsProvider>
                        <ProjectsListProvider>
                            {children}
                        </ProjectsListProvider>
                    </CheckedItemsProvider>
                </FiltersProjectsProvider>
            </SearchProvider>
        </SortProjectsProvider>
    );
};

export default MainProjectsProvider;