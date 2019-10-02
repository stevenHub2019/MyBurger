import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {

    //active is hard-coded ; how to make it dynamic?
    // pass exact as a props into NavigationItem component
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact clicked={props.clicked}>Burger Builder </NavigationItem>
            {props.isAuth?<NavigationItem link='/orders' clicked={props.clicked} > Orders </NavigationItem>:null}
            {!props.isAuth
                ?<NavigationItem link='/auth' clicked={props.clicked} > Authenticate </NavigationItem>
                :<NavigationItem link='/logout'clicked={props.clicked} > Logout </NavigationItem> }
            
        </ul>
    )
}

export default NavigationItems;
