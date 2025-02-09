import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLs();
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };

  const handleEdit = (e, id) => {
    let todo = todos.filter((i) => {
      return i.id === id;
    });
    setTodo(todo[0].todo);

    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLs();
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2 sm:w-full">
        <h1 className="text-lg text-center font-bold text-violet-800 mb-6">
          iTask - Manage your todos at one place
        </h1>

        <div className="addTodo flex flex-col gap-4">
          <h2 className="text-lg font-bold mb-3 text-center">Add a Todo</h2>
          <input
            type="text"
            value={todo}
            onChange={handleChange}
            className="w-full rounded-lg px-4 py-2 border-2 border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length < 3}
            className="bg-violet-800 p-3 py-1 text-white rounded-md disabled:bg-violet-400"
          >
            Add
          </button>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            onChange={toggleFinished}
            checked={showFinished}
            className="h-5 w-5"
          />
          <label className="text-sm font-medium">Show Finished</label>
        </div>

        <h2 className="text-lg font-bold mt-6">Your Todos</h2>
        <div className="todos mt-4">
          {todos.length === 0 && (
            <div className="m-5 text-center text-gray-500">No todos to display</div>
          )}

          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex justify-between items-center my-4 border-b-2 border-gray-200 pb-3">
                  <div className="flex gap-3 items-center">
                    <input
                      name={item.id}
                      type="checkbox"
                      onChange={handleCheckbox}
                      checked={item.isCompleted}
                      className="h-5 w-5"
                    />
                    <div
                      className={`text-sm ${item.isCompleted ? "line-through text-gray-500" : ""}`}
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex space-x-3">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 p-2 text-white rounded-md hover:bg-violet-600 transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-violet-800 p-2 text-white rounded-md hover:bg-violet-600 transition-colors"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
