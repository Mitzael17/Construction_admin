import React from 'react';
import {useSearchContext} from "../../../../hooks/contextHooks/useSearchContext";
import ListItemsProvider from "../../../../components/Providers/ListItemsProvider";
import {$getLogs} from "../../../../api/logsAPI";
import {ListItem} from "../../../../types/components/ListsComponents";
import {useDateContext} from "../../../../hooks/contextHooks/useDateContext";
import {LogsListParameters} from "../../../../types/API/logs";
import {dateToFormat} from "../../../../utils/date";
import {useSortContext} from "../../../../hooks/contextHooks/useSortContext";

const LogsListProvider = ({children}: {children: JSX.Element}) => {

    const limit = 50;

    const [search] = useSearchContext();
    const [{dateFrom, dateTo}] = useDateContext();
    const [sort] = useSortContext();

    return (
        <ListItemsProvider limitLoadingItems={limit} callback={callbackLoading}>
            {children}
        </ListItemsProvider>
    );

    async function callbackLoading(page: number) {

        const parameters: LogsListParameters = {
            page,
            search,
            limit,
            sort,
            date_to: dateToFormat(dateTo, 'Y-m-d h:i:s'),
            date_from: dateToFormat(dateFrom, 'Y-m-d h:i:s')
        }

        const response = await $getLogs(parameters);

        const result: ListItem[] = response.map( item => {

            const titleLayout = (
                <div className='flex flex-a-c'>
                    <div className='w-50px h-50px min-h-50px min-w-50px mr-10px'>
                        <div className='profileLogo'>
                            <img src={item.admin.image} alt='logo' loading='lazy' />
                        </div>
                    </div>
                    {item.admin.name}
                </div>
            );

            const subtitleLayout = (
                <div>
                    {item.message}
                    <div className='mt-10px mb-10px'>Date: {item.date_and_time}</div>
                </div>
            );

            return {
                id: item.id,
                title: titleLayout,
                subtitle: subtitleLayout,
            }

        });

        return result;
    }

};

export default LogsListProvider;