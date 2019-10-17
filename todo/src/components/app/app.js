import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddItem from "../add-item";

import "./app.css";

export default class App extends Component {
    constructor() {
        super();
        this.maxId = 100;

        this.createTodoItem = label => {
            return {
                label,
                important: false,
                done: false,
                id: this.maxId++
            };
        };

        this.state = {
            todoData: [
                this.createTodoItem("Drink Coffee"),
                this.createTodoItem("Write Somethink"),
                this.createTodoItem("Have a lunch")
            ]
        };

        this.deleteItem = id => {
            this.setState(({ todoData }) => {
                const idx = todoData.findIndex(el => el.id === id);

                // !нельзя изменять стейт, поэтому создаем копию массива
                const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
                return {
                    todoData: newArray
                };
            });
        };

        this.addItem = text => {
            const newItem = this.createTodoItem(text);

            this.setState(({ todoData }) => {
                const newArray = [...todoData, newItem];
                return {
                    todoData: newArray
                };
            });
        };

        this.toggleProperty = (arr, id, propName) => {
            const idx = arr.findIndex(el => el.id === id);

            const oldItem = arr[idx];
            const newItem = { ...oldItem, [propName]: !oldItem[propName] };

            return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
        };

        this.onToggleDone = id => {
            this.setState(({ todoData }) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'done')
                };
            });
        };

        this.onToggleImportant = id => {
            this.setState(({ todoData }) => {
                return {
                    todoData: this.toggleProperty(todoData, id, 'important')
                };
            });
        };
    }

    render() {
        const { todoData } = this.state;
        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={todoData}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <AddItem onButtonClick={this.addItem} />
            </div>
        );
    }
}
