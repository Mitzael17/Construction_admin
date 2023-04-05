import React, {memo, useState} from 'react';
import Modal from "../../../../components/Modals/Modal";
import DateRangeModalContent from "../../../../components/Modals/Content/DateRangeModalContent";
import CalendarIcon from "../../../../components/Icons/KalaiIcons/CalendarIcon";

const LogsDate = memo(() => {

    const [showDateModal, setShowDateModal] = useState(false);


    return (
        <>
            <div
                className='kalaiIcon--box'
                onClick={() => {
                    setShowDateModal(prev => !prev);
                }}>
                <CalendarIcon />
            </div>
            <Modal value={showDateModal} setValue={setShowDateModal} title='Date range'>
                <DateRangeModalContent />
            </Modal>
        </>

    );
});

export default LogsDate;