import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const navigation = (props) => {
    return (
        // <div className="nav-container">
        //     <div className="nav-item">
        //         <NavLink to={'/'} exact >Home</NavLink>
        //     </div>
        //     <div className="nav-item">
        //         <NavLink to={'/users'} exact >Customers</NavLink>
        //     </div>
        //     <div className="nav-item">
        //         <NavLink to={'/teachers'} exact >Teachers</NavLink>
        //     </div>   
        // </div>
        <List className={'list'}>
            <ListItem button key={'main'} href={"/"} className="list-item">
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                
                <NavLink to={'/'} exact className={'nav-item'}>
                    <ListItemText primary={'Home'} />
                </NavLink>
            </ListItem>
            <ListItem button key={'customrers'} href={"#users"} className="list-item">
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                <NavLink to={'/users'} exact className={'nav-item'}>
                    <ListItemText primary={'Customers'} />
                </NavLink>
                {/* <ListItemText primary={'customrers'} /> */}
            </ListItem>
            {/* <ListItem button key={'customrers'}> */}
                {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                {/* <ListItemText primary={'customrers'} />
            </ListItem> */}
        </List>
    )
}

export default navigation;