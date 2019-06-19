import React, {Component} from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import Navigation from '../Navigation/Navigation';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import logo from '../../content/logo.png';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import './Layout.css';

const drawerWidth = 240;

const useStyles = makeStyles({
    appBar: {
        marginLeft: drawerWidth
    }
    // appBarShift: {
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     marginLeft: drawerWidth,
    //     transition: theme.transitions.create(['margin', 'width'], {
    //       easing: theme.transitions.easing.easeOut,
    //       duration: theme.transitions.duration.enteringScreen,
    //     }),
    // },
});

class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            menuOpen: false,
            classes: {}
        };
        this.menuHandler = this.menuHandler.bind(this);
        this.changeSearchValue = value => this.setState({ searchValue: value });
    }

    menuHandler() {
        this.setState({ menuOpen: !this.state.menuOpen })
    }
    componentDidMount() {
        // this.setState({ classes: useStyles() })
    }
    render() {
        return (
            <div className={ 'root' }>
                <AppBar
                    position="fixed"
                    className={ this.state.menuOpen ? 'appBarShift' : '' }
                >
                    <Toolbar className={'header'}>
                        <div>
                            <img src={logo} />
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.menuHandler}
                                edge="start"
                                // className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <Button color="inherit">Login</Button>
                        {/* <Typography variant="h6" noWrap>
                            Persistent drawer
                        </Typography> */}
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={this.state.menuOpen ? 'drawer' : ''}
                    anchor="left"
                    variant="persistent"
                    onClose={this.menuHandler}
                    open={this.state.menuOpen}
                    // classes={{
                    //   paper: classes.drawerPaper,
                    // }} 
                >
                    <div className={"drawer-header"}>
                        <IconButton color="primary" className={"drawer-header-button"}  onClick={this.menuHandler}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Navigation></Navigation>
                    
 
                </Drawer>
            
                <main className={'content'}>
                    <div>
                        {this.props.children}
                    </div>
                </main>
            </div>
    )}
}

export default Layout;