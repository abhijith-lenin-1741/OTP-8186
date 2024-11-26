import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { returnValue } from "../utils/services";
import {
  changeStatus,
  deleteItem,
  modifyItem,
  toggleModal,
} from "../Redux/todoSlice";
import { Alert } from "antd";
import { Spin } from "antd";

const ModifyModal = () => {
  const modData = useSelector((state) => state.todo.modifyData);
  const dispatch = useDispatch();
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [modifyTaks, setModifyTask] = useState({
    taskName: modData?.taskName,
    taskDesc: modData?.taskDesc,
  });
  useEffect(() => {
    if (modData) {
      setModifyTask({
        taskName: modData?.taskName || "",
        taskDesc: modData?.taskDesc || "",
      });
    }
  }, [modData]);
  const handleSubmit = (e) => {
    setAlert(true);
    setMessage("Task Updated Successfully!!");
    e.preventDefault();
    const taskWithDateTime = {
      taskName: modifyTaks?.taskName,
      taskDesc: modifyTaks?.taskDesc,
      addedDate: modData?.addedDate,
      addedTime: modData?.addedTime,
      id: modData?.id,
    };
    dispatch(modifyItem(taskWithDateTime));
    setTimeout(() => {
      setAlert(false);
      dispatch(changeStatus());
    }, 1000);
  };

  const handleDelete = () => {
    setAlert(true)
    setMessage("Task Deleted Successfully!!");
    dispatch(deleteItem(modData));
    setTimeout(() => {
      setAlert(false);
      dispatch(changeStatus());
    }, 1000);
  };
  console.log("modifyTaks", modifyTaks);
  return (
    <>
      {alert && <Alert message={message} type="success" />}
      {!alert && (
        <div className="container mx-auto my-10">
          <h1 className="text-center text-3xl font-semibold mb-4">
            Modify Modal
          </h1>
          <div className="md:w-1/2 mx-auto">
            <div className="bg-white shadow-md rounded-lg p-6">
              <form id="todo-form" onSubmit={handleSubmit}>
                <div className="flex mb-4 flex-col">
                  <input
                    type="text"
                    className="w-full px-4 py-2 mr-2 rounded-lg
                             border-gray-300 focus:outline-none
                              focus:border-blue-500"
                    id="todo-input"
                    placeholder="Edit Task Name"
                    value={modifyTaks?.taskName}
                    name="taskName"
                    onChange={(e) => returnValue(e, setModifyTask)}
                    required
                  />
                  <input
                    type="text"
                    className="w-full px-4 py-2 mr-2 rounded-lg
                             border-gray-300 focus:outline-none
                              focus:border-blue-500"
                    id="todo-input"
                    placeholder="Edit Task Description"
                    value={modifyTaks?.taskDesc}
                    name="taskDesc"
                    onChange={(e) => returnValue(e, setModifyTask)}
                    required
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 
                            text-white font-bold py-2 px-4 rounded"
                  >
                    Modify
                  </button>
                </div>
              </form>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 
                            text-white font-bold py-2 px-4 rounded mt-4 w-full"
              >
                Delete
              </button>
              <ul id="todo-list"></ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModifyModal;
