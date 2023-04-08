import React, {memo} from 'react';
import TinyInput from "../../../components/UI/Input/TinyInput";
import LogsSort from "../components/headerComponents/LogsSort";
import LogsDate from "../components/headerComponents/LogsDate";
import {useSearchForSearchContext} from "../../../hooks/useSearchForSearchContext";
import {useListItemsContext} from "../../../hooks/contextHooks/useListItemsContext";

const LogsHeader = memo(() => {

    const [, {resetItems: resetLogs}] = useListItemsContext();
    const [search, setSearch] = useSearchForSearchContext(resetLogs);

    return (
        <div className="main__header mainLogsHeader">
            <div className='flex flex-j-sb'>
                <div className="kalaiIcon-container flex relative">
                    <LogsDate />
                    <LogsSort />
                </div>
            </div>
            <div className='w-100 max-w-350px'>
                <TinyInput placeholder='Write admin name' value={search} setValue={setSearch} />
            </div>
        </div>
    );
});

export default LogsHeader;