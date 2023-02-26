import React from 'react';

const ProfileLogo = ({src, alt = ''}: {src: string, alt?: string}) => {
    return (
        <div className='profileLogo'>
            <img src={src} alt={alt} />
        </div>
    );
};

export default ProfileLogo;