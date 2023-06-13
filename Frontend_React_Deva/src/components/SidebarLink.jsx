/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const SidebarLink = ({ active, icon, children, ...props }) => {
    const classes = active
        ? 'relative px-4 py-3 flex items-center align-middle space-x-2 rounded-xl text-white bg-gradient-to-r from-emerald-600 to-green-600'
        : 'px-4 py-3 flex items-center align-middle space-x-2 rounded-md text-gray-600 group hover:text-green-600 hover:bg-gray-100 active:bg-gray-200';

    return (
        <li>
            <a {...props} className={classes}>
                <div className="flex justify-center items-center">
                    <i className={icon}></i>
                </div>
                <span className="font-medium text-sm">{children}</span>
            </a>
        </li>
    );
};

SidebarLink.propTypes = {
    active: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default SidebarLink
