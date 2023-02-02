import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { combineReducers } from 'redux';






const shelf = (state = [],action) =>{
    switch (action.type){
      case 'SET_SHELF':
        return action.payload;
      default: 
        return state;  
    }
  }
  
  export default shelf; 