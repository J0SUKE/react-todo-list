import React from "react";
import TasksContainer from "./TasksContainer.js";

export default class Todo extends React.Component
{
    constructor(props)
    {
        super(props);
        this.ids = 0;
        this.tasks = [];

        this.handleSubmition = this.handleSubmition.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.filtertask = this.filtertask.bind(this);

        this.state = {
            selection:"",
            focus:false,
            value:"",
            filter:"all"
        }
    }
    
    render()
    {
        return (
            <div className="Todo-container">
                <form className={"write-task "+this.state.selection} onSubmit={this.handleSubmition}>
                    <input type="submit" value={""}/>
                    <input type="text" placeholder="Create a new Task..." spellCheck={false}
                            value={this.state.value}
                            onFocus={this.handleSelection}
                            onBlur={this.handleSelection}
                            onSubmit={this.handleSubmition}
                            onInput={this.handleInput}
                        />
                </form>
                <TasksContainer filter={this.state.filter} tasks={this.tasks} deleteTask={this.deleteTask} completeTask={this.completeTask}>
                    <div className="options">
                        <div className="items-left">{this.tasks.length} items left</div>
                        <ul className="selection-opt">
                            <li onClick={this.filtertask} data-filter="all" className="active">All</li>
                            <li onClick={this.filtertask} data-filter="active">Active</li>
                            <li onClick={this.filtertask} data-filter="completed">Completed</li>
                        </ul>
                        <div className="clear-completed">
                            clear completed
                        </div>
                    </div>
                </TasksContainer>
            </div>
        )
    }

    handleSubmition(e)
    {
        e.preventDefault();
        
        this.tasks.push({
            id:this.ids,
            content:this.state.value,
            completed:false
        })
        this.ids++;
        this.setState({
            value:""
        })  
    }


    handleSelection()
    {
        this.setState((state)=>({
            selection:(state.focus? "": "active"),
            focus:(state.focus? false: true),
        }))
    }

    handleInput(e)
    {
        this.setState({
            value:e.target.value
        })   
    }

    deleteTask(e)
    {
        let taskSection;
        if (e.target.className=="task") 
        {
            taskSection=e.target;
        }
        else
        {
            taskSection=e.target.closest(".task");
        }
        const id = parseInt(taskSection.getAttribute("id"));

        let i=0;
        while(this.tasks[i].id!=id)
        {
            i++;
        }

        this.tasks.splice(i,1);

        this.setState((state)=>({
            value:state.value
        }))
    }

    completeTask(e)
    {
        let taskSection;
        if (e.target.className=="task") 
        {
            taskSection=e.target;
        }
        else
        {
            taskSection=e.target.closest(".task");
        }

        const id = parseInt(taskSection.getAttribute("id"));

        let i=0;
        while(this.tasks[i].id!=id)
        {
            i++;
        }
        console.log(id,i);
        this.tasks[i].completed = !this.tasks[i].completed;
        taskSection.setAttribute("completed",this.tasks[i].completed);

        this.setState((state)=>({
            value:state.value
        }))
    }

    filtertask(e)
    {
        let filterAlgo = e.target.dataset.filter;

        e.target.classList.add("active");
        [...document.querySelectorAll(".selection-opt li")].filter(element=>element.dataset.filter!=filterAlgo).forEach(element => {
            element.classList.remove("active");
        });

        this.setState((state)=>{
            return {filter:filterAlgo}
        })
    }
}