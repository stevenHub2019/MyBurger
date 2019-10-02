import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch, Redirect} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import {connect} from 'react-redux';
import * as actionCreator from './store/actions/index';


class App extends Component {
  componentDidMount(){
    this.props.onCheckAuthState();
    
    //withRouter give the router props such history
    //this.props.history.push('/auth')
  }

  render(){

    let route;
    if(this.props.isAuth){
      route=(
        <Switch>
          <Route path='/checkout' component= {Checkout}/> 
          <Route path='/orders' component={Orders}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' component ={BurgerBuilder}/>
        </Switch>
      )}else{
        route=(
          <Switch>
            <Route path='/auth' component={Auth}/>
            <Route path='/' component ={BurgerBuilder}/>
            <Redirect to='/' />
          </Switch>
        );
      };

    

    return (
      <div>
        
        <Layout>
          {route}
        </Layout>    
    
          
      </div>
    );
  }
  
}


const mapStateToProps=state=>{
  return{
    isAuth:state.ar.token!==null
  }
}

const mapDispatchToProps = dispatch=>{
  return {
    onCheckAuthState: ()=>dispatch(actionCreator.checkAuthState())
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(App);



