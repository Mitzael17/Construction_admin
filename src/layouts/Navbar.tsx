import React, {useState} from 'react';
import ProfileLogo from "../components/ProfileLogo";
import {useUser} from "../hooks/useUser";
import LogoutIcon from "../components/Icons/LogoutIcon";
import SettingsIcon from "../components/Icons/SettingsIcon";
import {deleteCookie} from "../utils/cookie";
import Modal from "../components/Modals/Modal";
import UserSettingsModalContent from "../components/Modals/Content/UserSettingsModalContent";

const Navbar = () => {

    const [userData] = useUser();
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    return (
        <div className='navbar'>
            <div className='w-50px h-50px'>
                <ProfileLogo src={userData.image} alt='logo'/>
            </div>
            <div onClick={() => setShowSettingsModal(true)} className="navbar__icon">
                <SettingsIcon />
            </div>
            <div onClick={logout} className="navbar__icon">
                <LogoutIcon />
            </div>
            <Modal title='Account Settings' value={showSettingsModal} setValue={setShowSettingsModal}>
                <UserSettingsModalContent />
            </Modal>
        </div>
    );

    function logout() {

        deleteCookie('token');

        document.location.href = '/';

    }

};

export default Navbar;