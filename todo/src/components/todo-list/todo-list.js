import React from "react";

import TodoListItem from "../todo-list-item";
import "./todo-list.css";

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
    const elements = todos.map(item => {
        // деструктуризация, Rest parameter
        const { id, ...itemProps } = item;

        return (
            // Не использовать в качестве ключа порядковый элемент массива
            // Падает производительность, т.к. элементы сравниваются по порядку
            // Можно, только если элементы вставляются в конец списка, иначе жди фулл репеинт.
            <li className="list-group-item" key={id}>
                <TodoListItem
                    {...itemProps}
                    onDeleted={() => onDeleted(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                    onToggleDone={() => onToggleDone(id)}
                />
            </li>
        );
    });

    return <ul className="list-group todo-list">{elements}</ul>;
};

export default TodoList;
