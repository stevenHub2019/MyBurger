import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {

    //active is hard-coded ; how to make it dynamic?
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' active >Burger Builder </NavigationItem>
            <NavigationItem link='/' >Check Out </NavigationItem>
        </ul>
    )
}

export default NavigationItems;
