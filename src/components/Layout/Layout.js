import React,{Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state={showSideDrawer:true}

    closeSideDrawerHandler=()=>{
        this.setState({showSideDrawer:false});
    }

    openSideDrawerHandler=()=>{
        this.setState({showSideDrawer:true});
    }

    render(){
        
        return (
            <Aux>
                <Toolbar openSideDrawer={this.openSideDrawerHandler} />
                <SideDrawer 
                closeSideDrawer={this.closeSideDrawerHandler}
                showSideDrawer={this.state.showSideDrawer} />
                <main className={classes.content} >{this.props.children} </main>
            </Aux>

        )
    }


} 

    


export default Layout;





