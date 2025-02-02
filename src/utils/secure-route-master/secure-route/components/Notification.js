import React, { useState } from 'react';

import {

    IconButton,
    Menu,
    MenuItem,

} from '@mui/material';

import menuData from '../../../config/header.json';

import { NavLink } from 'react-router-dom'

const Notification = (props) => {

    const handleMenuOpen = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setProfileAnchorEl(null);
    };
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    return (
        <>
            <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
                <i className={`fa-solid ${menuData.topBar.notification.icon}`}></i>
            </IconButton>

            <Menu
                anchorEl={profileAnchorEl}
                open={Boolean(profileAnchorEl)}
                onClose={handleMenuClose}
            >
               <div style={{
                height: "100px",
                width:"600px"
               }}>
                <ul>
                    <li>Message from Jay</li>
                    <li>Message from Raj</li>
                    <li>Message from Shubh</li>
                    <li>Message from Akshu</li>
                </ul>
               </div>

            </Menu>
        </>
    )
}

export default Notification
