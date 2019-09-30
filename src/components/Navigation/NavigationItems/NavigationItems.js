import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {

    //active is hard-coded ; how to make it dynamic?
    // pass exact as a props into NavigationItem component
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' exact >Burger Builder </NavigationItem>
            <NavigationItem link='/orders' > Orders </NavigationItem>
            <NavigationItem link='/auth' > Authenticate </NavigationItem>
        </ul>
    )
}

export default NavigationItems;
