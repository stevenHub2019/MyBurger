import React from 'react';
import classes from './Input.module.css';


const Input = (props) => {

    let inputElement=null;

    //{...props} passes all props from parent Input component to standard html element <input>
    // props.inputType from React cutomized component is passed to standard html element <input>
    // this is invalid as an attribute of a html element i.e.  <input inputType=....>  invalid
    //take out inputType from props and pass the other props to <input>

    //const {inputType,...other}=props

    switch( props.elementType){
        case ('input'):
            inputElement=<input className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
        case ('textarea'):
            inputElement=<textarea className={classes.InputElement} {...props.elementConfig} value={props.value}/>;
            break;
        default:
            inputElement=<input className={classes.InputElement} {...props.elementConfig} value={props.value}/>;  
    }




    return (
        <div className={classes.Input}>

            <label className={classes.Label}> {props.lable} </label>
            {inputElement}
            
        </div>
    )
}

export default Input
