import React,{useState,useEffect} from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

function App() {
  
  const [myState,changeState]=useState({show:true});

  const showOff=()=>{
    changeState({show:!myState.show});
    console.log(myState.show);
  };

  // useEffect(()=>{
  //   setTimeout(()=>{changeState({show:false})},5000);
  // });
    
  setTimeout(()=>{changeState({show:false})},5000);

  return (
    <div onClick={showOff}>
      <Layout>
        {myState.show?<BurgerBuilder />:null}
      </Layout>      
    </div>
  );
}

export default App;



