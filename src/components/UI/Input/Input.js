import React from 'react';
import classes from './Input.module.css';


const Input = (props) => {

    let inputElement=null;

    //{...props} passes all props from parent Input component to standard html element <input>
    // props.inputType from React cutomized component is passed to standard html element <input>
    // this is invalid as an attribute of a html element i.e.  <input inputType=....>  invalid
    //take out inputType from props and pass the other props to <input>

    //const {inputType,...other}=props

    let inputClasses=[classes.InputElement];
    if(!props.valid && props.shouldValidate && props.isTouch){
        inputClasses.push(classes.Invalid);
    }

    inputClasses=inputClasses.join(' ');

    switch( props.elementType){
        case ('input'):
            console.log(props.value);
            inputElement= <input className={inputClasses} 
                value={props.value} 
                {...props.elementConfig}
                onChange={props.changed} />;
            break;

        case ('textarea'):
            inputElement= <textarea className={inputClasses} 
                value={props.value} 
                {...props.elementConfig}
                onChange={props.changed} />;
            break;

        case ('select'):
            inputElement=(
                <select 
                    className={inputClasses}  
                    value={props.value}
                    onChange={props.changed}>

                    {
                        props.elementConfig.options.map(option=>{
                            
                            return (
                                <option key={option.value} value={option.value} >
                                    {option.displayValue}
                                </option>
                            )
                        })
                    }
                </select>
            );
            break;

        default:
            inputElement= <input className={inputClasses} 
                value={props.value} 
                {...props.elementConfig}
                onChange={props.changed} />;  
    }


                
    //add error message prompt
    return (
        <div className={classes.Input}>

            <label className={classes.Label}> {props.lable} </label>
            {inputElement}
            
        </div>
    )
}

export default Input
