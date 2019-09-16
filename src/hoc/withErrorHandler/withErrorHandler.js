import React,{Component, Fragment} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapperComponent,axios) => {
    return class extends Component{
        state={error:null}

        componentDidMount(){
            axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            },null)

            axios.interceptors.response.use(res=>res,
                error=>{
                    this.setState({error:error})
                })
        }

        resetError=()=>{
            this.setState({error:null});
        }

        render(){
            return (
                <Fragment>
                    <Modal show={this.state.error} closeModalHandler={this.resetError}> 
                        {this.state.error? this.state.error.message:null}

                    </Modal>
                    <WrapperComponent {...this.props}/>
                </Fragment>

            )
            

        }
         

    }
       
    
}

export default withErrorHandler;
