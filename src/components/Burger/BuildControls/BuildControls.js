import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';


const controls=[
    { label:'Salad', type:'salad' },
    { label:'Cheese', type:'cheese' },
    { label:'bacon', type:'bacon' },
    { label:'Meat', type:'meat' },
];



const buildControls = (props) => {

    let btn=(
        <button className={classes.OrderButton}
                    onClick={props.showModal} >
            SIGNIN TO ORDER NOW
        </button>
    );

    if(props.isAuth){
        btn=(
            <button className={classes.OrderButton}
                    disabled={!props.purchaseable}
                    onClick={props.showModal} >
            ORDER NOW
            </button>
        );
    };

    return (
        <div className={classes.BuildControls}>
            <p> <strong> Current Price: $ {props.price.toFixed(2)} </strong></p>
            {
                controls.map((ctrl)=>{
                    return <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label}
                        addHandler={()=>props.addIngrHandler(ctrl.type)} 
                        removeHandler={()=>props.removeIngrHandler(ctrl.type)}
                        disabled={props.disabledInfo[ctrl.type]}
                        />
                })
            } 
            
           {btn}

        </div>
    )
}

export default buildControls;