import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import * as actionCreator from '../../../store/actions/index';
import {connect} from 'react-redux';


class Logout extends Component {
    componentDidMount(){
        this.props.onLogout();
    }

    render() {
        return (
            <Redirect to='/' />
        )
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onLogout: ()=> dispatch(actionCreator.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);