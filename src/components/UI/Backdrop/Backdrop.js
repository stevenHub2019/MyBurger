import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {
    // only inside JSX element, use {} to refer to JS code
    // if outside JSX element, use JS code normally 

    //const backdrop = props.show? <div className={classes.Backdrop} onClick={props.closeModal}></div> : null
    //const backdrop=<div className={classes.Backdrop} onClick={props.closeModal}></div>
    // return {backdrop}  failed!!!! should return JSX not an OBJECT : use return backdrop instead will work

    return props.show? <div className={classes.Backdrop} onClick={props.closeModal}></div> : null ;
    
}

export default backdrop;
