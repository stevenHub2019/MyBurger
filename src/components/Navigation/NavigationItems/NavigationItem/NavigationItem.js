import React from 'react';
import classes from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

const NavigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink 
                to={{pathname:props.link }} 
                exact={props.exact} 
                activeClassName={classes.active}
                onClick={props.clicked} >

                {props.children}
                
            </NavLink>

            {/* <a href={props.link}
            className= {props.active? classes.active: null} > {props.children}</a> */}

        </li>
    )
}

export default NavigationItem;
