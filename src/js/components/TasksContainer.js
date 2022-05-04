import React, { Children } from "react";

export default class TasksContainer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.tasks = props.tasks;
        this.deleteTask = props.deleteTask.bind(this);
        this.completeTask = props.completeTask.bind(this);
        //this.filter = props.filter;
    }
    render()
    {
        let items;

        if (this.props.filter==="all") {
            items=[...this.tasks];
        }
        else if(this.props.filter==="active")
        {
            items=[...this.tasks].filter(element=>!element.completed);
        }
        else
        {
            items=[...this.tasks].filter(element=>element.completed);
        }

        
        items =  items.map(
            (element)=>(
                        <li completed={(element.completed).toString()} className="task" id={element.id} key={element.id}>
                            <div className="li-left">
                                <button className="complete-btn" onClick={this.completeTask}></button>
                                <div className="task-content">
                                    {element.content}
                                </div>
                            </div>
                            <div className="delete-btn" onClick={this.deleteTask}></div>
                        </li>
                    ));


        return(
            <ul className="taskContainer">
                {items}
                {this.props.children}
            </ul>
        )
    }
}