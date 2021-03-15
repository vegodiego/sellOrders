import React, {useEffect} from 'react';
import { connect } from "react-redux";
import {updateBrokenFalse} from "../actionCreators";


const Broken = (props) => { 
  const notBucle = null;
  
  useEffect(() => {
    props.updateBrokenFalse();
  }, [notBucle]); 

  return (
    <div>
      <h3>Something is broken!</h3>
    </div>     
  );
}

const mapStateToProps = state => {
  return {
    broken: state.broken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBrokenFalse(){
      dispatch(updateBrokenFalse());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Broken);