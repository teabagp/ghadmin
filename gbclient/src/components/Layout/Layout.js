import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Layout.css';

const layout = (props) => {
    return (
        <div>
            <Navigation></Navigation>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}

export default layout;