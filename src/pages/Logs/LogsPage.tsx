import React from 'react';
import MainLogsProvider from "./components/Providers/MainLogsProvider";
import Logs from "./Logs";

const LogsPage = () => {
    return (
        <MainLogsProvider>
            <Logs />
        </MainLogsProvider>
    );
};

export default LogsPage;