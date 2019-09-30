import React,{Component} from 'react';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';


class Auth extends Component{
    //state form
    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                value:'',
                validationRules:{
                    required: true,
                    isEmail:true
                },
                valid: false,
                isTouch: false
            },

            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validationRules:{
                    required: true,
                    minLength: 6
                    
                },
                valid: false,
                isTouch: false
            }
        }
    }   

    checkValidity=(value, rules)=>{
        let isValid=true;

        //check if a rule exists in validation
        if(rules.required){
            isValid=value.trim() !=='' && isValid;
        }

        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid=value.length<=rules.maxLength && isValid;
        }

        if(rules.isEmail){
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid= pattern.test(value) && isValid;
        }

        if(rules.isAlphaNumeric){
            const pattern=/^[a-z0-9]+$/i ;
            isValid= pattern.test(value) && isValid;
        }

        return isValid;

    }
            
    inputChangedHandler=(event, id)=>{
        //clone orderFrom from the state
        //immutably update the state
        const updatedControls={...this.state.controls};
        const updatedControlsElement={...updatedControls[id]};

        //update value
        updatedControlsElement.value=event.target.value;
        
        //update valid value
        updatedControlsElement.valid=this.checkValidity(updatedControlsElement.value,updatedControlsElement.validationRules)
        
        //update isTouch
        updatedControlsElement.isTouch=true;

        //transfer deeply cloned updatedControlsElement to updatedControls which can then be used to update orderFrom in the state
        updatedControls[id]=updatedControlsElement;

        // state update
        this.setState({controls:updatedControls});
    }

    render(){
        let formArray=[];
        let key;
        for(key in this.state.controls){
            formArray.push({
                id:key,//name, street, email, zipcode
                config:this.state.controls[key]  //{elementType:..,elementConfi:...}
            })
        }

        let inputs=formArray.map(form=>{
            return (
                <Input 
                    key={form.id}
                    elementType={form.config.elementType} 
                    value={form.config.value} 
                    elementConfig={form.config.elementConfig}
                    changed={(event)=>this.inputChangedHandler(event,form.id)}
                    valid={form.config.valid}
                    shouldValidate={form.config.validationRules}
                    isTouch={form.config.isTouch}
                    label={form.id}/> 

            )
        });

        // props is passed as an object and when spread, will turn to attribues key = value
        //how does onSubmit work??
        let form=(
            <form >
                {inputs}
                
                <Button btnType='Success' > Log In</Button>
            </form>
        );

        return (
            <div className={classes.Auth}>
                
                <h4>Log In</h4>
                
                {form}   

            </div>

        );
            
        
    }
}

export default Auth;