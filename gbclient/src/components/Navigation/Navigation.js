import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

const navigation = (props) => {
    return (
        <div className="nav-container">
            <div className="nav-item">
                <NavLink to={'/'} exact >Home</NavLink>
            </div>
            <div className="nav-item">
                <NavLink to={'/users'} exact >Users</NavLink>
            </div>         
        </div>
    )
}

export default navigation;