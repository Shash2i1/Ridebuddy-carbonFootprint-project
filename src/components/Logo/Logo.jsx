import React from 'react';
import logo from '../../assets/smallLogo.png';

function Logo({ width = '40px', altText = 'Company Logo' }) {
    return (
        <div>
            <img src={logo} alt={altText} style={{ width:width }} />
        </div>
    );
}

export default Logo;
