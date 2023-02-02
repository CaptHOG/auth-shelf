import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import { combineReducers } from "redux";

const shelf = (state = [], action) => {
  switch (action.type) {
    case "SET_SHELF":
      return action.payload;
    case "ADD_TO_SHELF":
      return [...state];
    default:
      return state;
  }
};

export default shelf;
