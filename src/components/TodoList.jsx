import React, { useState } from "react";
import { returnValue } from "../utils/services";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Redux/todoSlice";
import moment from "moment";
import { Alert } from "antd";
import ModifyModal from "./ModifyModal";

const TodoList = () => {
  const dispatch = useDispatch();
  const todo = useSelector(state => state?.todo?.items)
  const modify = useSelector((state) => state?.todo?.modifyTask);
  const [todoValue, setTodoValue] = useState({
    taskName: "",
    taskDesc: "",
    addedTime: "",
    addedDate: "",
  });
  const [alert, setAlert] = useState(false);
  const handleSubmit = (e) => {
    setAlert(true);
    e.preventDefault();
    const dateTime = new Date().toISOString();
    const date = moment(dateTime).format("YYYY-MM-DD");
    const time = moment(dateTime).format("HH:mm:ss");

    const taskWithDateTime = {
      ...todoValue,
      addedDate: date,
      addedTime: time,
      id: `td${todo?.length + 1}`
    };
    dispatch(addItem(taskWithDateTime));
    setTodoValue({
      taskName: "",
      taskDesc: "",
      addedDate: "",
      addedTime: "",
    });
    setTimeout(() => {
      setAlert(false);
    }, 1000);
  };

  console.log("todoValue", todoValue);
  if(modify) {
    return <ModifyModal />
  }
  return (
    <>
      {alert && <Alert message="Task Added Successfully!!" type="success" />}
      <div className="container mx-auto my-10">
        <h1 className="text-center text-3xl font-semibold mb-4">To Do List</h1>
        <div className="md:w-1/2 mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6">
            <form id="todo-form" onSubmit={handleSubmit}>
              <div className="flex mb-4 flex-col">
                <input
                  type="text"
                  className="w-full px-4 py-2 mr-2 rounded-lg
                         border-gray-700 focus:outline-none
                          focus:border-blue-500"
                  id="todo-input"
                  placeholder="Add Task Name"
                  name="taskName"
                  value={todoValue?.taskName}
                  required
                  onChange={(e) => returnValue(e, setTodoValue)}
                />
                <input
                  type="text"
                  className="w-full h-20 px-4 py-2 mr-2 rounded-lg
                         border-gray-300 focus:outline-none
                          focus:border-blue-500"
                  id="todo-input"
                  placeholder="Task Description"
                  name="taskDesc"
                  value={todoValue?.taskDesc}
                  required
                  onChange={(e) => returnValue(e, setTodoValue)}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 
                        text-white font-bold py-2 px-4 rounded"
                >
                  Add
                </button>
              </div>
            </form>
            <ul id="todo-list"></ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
