import React, {memo} from 'react';
import TinyInput from "../../../components/UI/Input/TinyInput";
import {useSearchContext} from "../../../hooks/contextHooks/useSearchContext";
import LogsSort from "../components/headerComponents/LogsSort";
import LogsDate from "../components/headerComponents/LogsDate";

const LogsHeader = memo(() => {

    const [search, setSearch] = useSearchContext();


    return (
        <div className="main__header mainHeader">
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