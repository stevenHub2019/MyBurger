import React,{Fragment} from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from '../SideDrawer/SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
    //....

    let SideDrawerClass=[classes.SideDrawer, classes.Close];
    if(props.showSideDrawer){
        SideDrawerClass=[classes.SideDrawer, classes.Open];
    }

    return (
        <Fragment>
            <Backdrop show={props.showSideDrawer} clicked={props.closeSideDrawer} />
            <div className={SideDrawerClass.join(' ')}>
                <div className={classes.Logo}><Logo height /></div>
                
                <nav>
                    <NavigationItems isAuth={props.isAuth} clicked={props.closeSideDrawer}/>
                </nav>
            </div>

        </Fragment>
        
    )
}

export default SideDrawer;
