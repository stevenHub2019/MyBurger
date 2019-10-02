import React, {Component, Suspense} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch, Redirect} from 'react-router-dom';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import {connect} from 'react-redux';
import * as actionCreator from './store/actions/index';

import Spinner from './components/UI/Spinner/Spinner';
//dynamic import
//Orders
const Orders=React.lazy(()=>import('./containers/Orders/Orders'));
//Checkout
const Checkout=React.lazy(()=>import('./containers/Checkout/Checkout'));
//Auth
const Auth=React.lazy(()=>import('./containers/Auth/Auth'));




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
          <Route path='/checkout' render={(props)=>(
            <Suspense {...props} fallback={<Spinner/>}>
              <Checkout {...props}/>
            </Suspense>
          )} /> 
          <Route path='/orders' render={(props)=>(
            <Suspense {...props} fallback={<Spinner/>}>
              <Orders {...props}/>
            </Suspense>
          )}/>
          <Route path='/auth' render={(props)=>(
            <Suspense {...props} fallback={<Spinner/>}>
              <Auth {...props}/>
            </Suspense>
          )}/>
          <Route path='/auth' component={Auth}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/' component ={BurgerBuilder}/>
        </Switch>
      )}else{
        route=(
          <Switch>
            <Route path='/auth' render={(props)=>(
              <Suspense {...props} fallback={<Spinner/>}>
                <Auth {...props}/>
              </Suspense>
            )}/>
            <Route path='/' component ={BurgerBuilder}/>
            <Redirect to='/' />
          </Switch>
        );
      };

    return (
      <Layout>
        {route}
      </Layout>   
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



