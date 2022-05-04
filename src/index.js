import "./scss/globals.scss";

import React from "react";
import ReactDOM  from "react-dom";

import Todo from "./js/components/Todo.js";

let root = document.querySelector(".app");

let App = ()=>{
    return (
        <div className="app">
            <header></header>
            <Todo/>
        </div>
    )
}

ReactDOM.render(
    <App/>,root
)

document.addEventListener("keyup",(e)=>{
    if (e.key=="/") 
    {
        document.querySelector(".write-task input[type=\"text\"]").focus();
    }
})
