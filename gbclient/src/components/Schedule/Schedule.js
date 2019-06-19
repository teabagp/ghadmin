import React from 'react';
import './Schedule.css';

const Schedule = (props) => {
    return (
        <div>
            {props.showPopup ? 
                <div className={'popup'}>
                <div className={'popup_inner'}>
                Hii
                        {/* <h1>{this.props.text}</h1>
                        <button onClick={this.props.closePopup}>close me</button> */}
                    </div>
                </div>
                :null
            }
        </div>
    );
}

export default Schedule;