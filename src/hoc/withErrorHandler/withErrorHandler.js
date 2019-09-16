import React,{Component, Fragment} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapperComponent,axios) => {
    return class extends Component{
        
        constructor(props){
            super(props);
            this.state={error:null};

            this.reqInterceptor=axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            },null);

            this.resInterceptor=axios.interceptors.response.use(res=>res,
                error=>{
                    this.setState({error:error})
                })
        }

        componentWillUnmount(){
            //test
            console.log('will unmount',this.resInterceptor,this.reqInterceptor)
            
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);

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
