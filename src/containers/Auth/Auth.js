import React,{Component} from 'react';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import {checkValidity} from '../../utility/utility';

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
                    minLength: 6  //user defined rule  //firebase or other server may impose their own rules
                    
                },
                valid: false,
                isTouch: false
            }
        },
        isSignUp:true
    }   

    
            
    inputChangedHandler=(event, id)=>{
        //clone orderFrom from the state
        //immutably update the state
        const updatedControls={...this.state.controls};
        const updatedControlsElement={...updatedControls[id]};

        //update value
        updatedControlsElement.value=event.target.value;
        
        //update valid value
        updatedControlsElement.valid=checkValidity(updatedControlsElement.value,updatedControlsElement.validationRules);
        
        //update isTouch
        updatedControlsElement.isTouch=true;

        //transfer deeply cloned updatedControlsElement to updatedControls which can then be used to update orderFrom in the state
        updatedControls[id]=updatedControlsElement;

        // state update
        this.setState({controls:updatedControls});
    }


    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp);
    }

    switchHandler=()=>{
        this.setState(prevState=>({
            isSignUp:!prevState.isSignUp
        }));
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirPath!=='/'){
            console.log(this.props.authRedirPath);
            console.log(this.props.buildingBurger);
            console.log(!this.props.buidlingBurger && this.props.authRedirPath!=='/');
            
            this.props.setAuthRedirPath('/');
        }
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
            <form onSubmit={this.submitHandler} >
                {inputs}
                
                <Button btnType='Success' > Submit </Button>
            </form>
        );
    
        if (this.props.loading){
            form= <Spinner/>
        };

        //error message
        let errorMsg=this.props.errorMsg? <h3>{this.props.errorMsg}</h3> : null;
        
        //redirect from login
        let loginRedirect= this.props.isAuth? <Redirect to={this.props.authRedirPath} />:null

        return (
            <div className={classes.Auth}>
                {loginRedirect}
                <h3>{this.state.isSignUp?'SIGN UP':'SIGN IN'}</h3>
                {errorMsg}
                {form}   
                <Button btnType='Danger' clicked={this.switchHandler} >
                    SWITCH TO {this.state.isSignUp?'SIGNIN':'SIGNUP'} 
                </Button>
            </div>
        ); 
    }
}


const mapDispatchToProps = dispatch=>{
    return{
        onAuth: (email,password,isSignUp)=>dispatch(actionCreator.auth(email,password,isSignUp)),
        setAuthRedirPath:(path)=>dispatch(actionCreator.setAuthRedirectPath(path))
    }
}

const mapStateToProps = state=>{
    return{
        loading:state.ar.loading,
        errorMsg:state.ar.errorMsg,
        isAuth: state.ar.token!==null,
        buildingBurger: state.bbr.building,
        authRedirPath:state.ar.authRedirectPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(Auth);