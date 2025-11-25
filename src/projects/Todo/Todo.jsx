import { useState } from "react";
import "./Todo.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";

const todoKey = "reactTodo";

export const Todo = () => {
    const [task, setTask] = useState(() =>{
        const rawTodos = localStorage.getItem(todoKey);

        if(!rawTodos) return [];
        return JSON.parse(rawTodos);
     });


    const handleFormSubmit = (inputValue) =>{
        const {id, content, checked } = inputValue;

        if(!content) return;
        // if(task.includes(inputValue)){
        //     return;
        // } 
        const ifTodoContentMatched = task.find(
            (curTask) => curTask.content ===content
        );
        if(ifTodoContentMatched) return;

        setTask((prevTask) => [...prevTask, {id, content, checked}]);

    };


    //Todo Item Delete One by one
    const handleDeleteTodo = (value) => {
        const updateTask = task.filter((curTask) => curTask.content !== value );
        setTask(updateTask);
    }

    const handleClearButton = () => {
        setTask([]);
    }

    const handleCheckedTodo = (content) => {
        const updatedTask = task.map((curTask) =>{
            if(curTask.content === content){
                return {...curTask, checked: !curTask.checked};
            }else{
                return curTask;
            }
        });
        setTask(updatedTask);
    }
//To Do Store Data
    localStorage.setItem(todoKey, JSON.stringify(task) );

    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <TodoDate />
            </header>
            <TodoForm onAddTodo={handleFormSubmit} />
            <section className="myUnOrdList">
                <ul>
                    {
                        task.map((curTask ) =>{
                            return <TodoList 
                            key={curTask.id} 
                            data={curTask.content}
                            checked={curTask.checked} 
                            onHandleDeleteTodo={handleDeleteTodo} 
                            onHandleCheckedTodo = {handleCheckedTodo}
                            /> })
                    }
                </ul>
            </section>
            <section>
                <button className="clear-btn" onClick={handleClearButton}>Clear All</button>
            </section>
        </section>
    )
}