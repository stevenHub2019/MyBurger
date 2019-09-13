import React from 'react';
import classes from './Button.module.css';

//do not try to assign className to class in module.css directly
// always access the class name via the imported object from module.css 

const Button = (props) => {
    console.log([classes.Button, classes[props.btnType]].join(' '));
    return (
        <button 
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}
        style={{textTransform:'uppercase'}} >

            {props.children}
        </button>
    )
}

export default Button;