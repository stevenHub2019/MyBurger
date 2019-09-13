import React,{Fragment} from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsList=Object.keys(props.ingredients).map(
        (ingrKey)=>{
            return(
                <li key={ingrKey}>
                    <span style={{textTransform:'capitalize'}}> {ingrKey} </span> : {props.ingredients[ingrKey]}
                </li>
            )
        }

    );
        
    
    return (
        <Fragment>
            <p>Your Order </p>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientsList}
            </ul>
            <p>Continue to checkout ?</p>
            <Button btnType='Success'
            clicked={props.continuePurchase}  >Continue</Button>
            
            <Button btnType='Danger'
            clicked={props.cancelPurchase} >Cancel</Button>
            
        </Fragment>
    )
}

export default orderSummary;
