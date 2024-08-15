"use client";
import React, { useState } from "react";
import { toast } from "sonner"; 

const ToDo = () => {
  const GetToDo = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }
    return [];
  };

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(GetToDo());
  const [editIndex, setEditIndex] = useState(null); 
  const [editTask, setEditTask] = useState(""); 

  const AddToDo = (task) => {
    if (!task || task === "") {
      return toast.warning("Cannot Add Empty Task");
    }
    const updatedTodos = [...todos, { task, completed: false }];
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
    setTask("");
    toast.success("New Task Added.");
  };

  const EditToDo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const DeleteToDo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditTask(todos[index].task);
  };

  const saveEdit = () => {
    if (editTask.trim() === "") return;

    const updatedTodos = todos.map((todo, i) =>
      i === editIndex ? { ...todo, task: editTask } : todo
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditTask("");
    toast.success("Task Updated.");
  };

  return (
    <>
      <input
        id="inputfield"
        type="text"
        placeholder="Ex - 'Feed the cats'"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        id="addtodobutton"
        onClick={() => AddToDo(task)} 
      >
        Add To-Do
      </button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editIndex === index ? (
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
              />
            ) : (
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
                onClick={() => EditToDo(index)} 
              >
                {todo.task}
              </span>
            )}
            {editIndex === index ? (
              <>
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => startEdit(index)}>Edit</button>
                <button onClick={() => DeleteToDo(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ToDo;
