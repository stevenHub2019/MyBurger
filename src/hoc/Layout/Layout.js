import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';



class Layout extends Component {
    state={showSideDrawer:false}

    closeSideDrawerHandler=()=>{
        this.setState({showSideDrawer:false});
    }

    toggleSideDrawerHandler=()=>{
        this.setState((prevState)=>{ 
            return {showSideDrawer:!prevState.showSideDrawer};
        });
    }

    render(){
        
        return (
            <Aux>
                <Toolbar openSideDrawer={this.toggleSideDrawerHandler}
                isAuth={this.props.isAuth} />

                <SideDrawer 
                closeSideDrawer={this.closeSideDrawerHandler}
                showSideDrawer={this.state.showSideDrawer}
                isAuth={this.props.isAuth} />
                
                <main className={classes.content} >{this.props.children} </main>
            </Aux>

        )
    }


} 

    
const mapStateToProps=(state)=>{
    return {
        isAuth:state.ar.token!==null
    }
}

export default connect(mapStateToProps)(Layout);





