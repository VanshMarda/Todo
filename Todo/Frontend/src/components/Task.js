import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";


const Task = ({ taskName, taskTime, onDelete, onUpdate }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [updatetask, setupdateTask] = useState('');
  const [updatetime, setupdateTime] = useState('');

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = () => {
    onUpdate(updatetask, updatetime)
    setShowPopup(false);
  }

  return (
    <div className="bg-white p-4 rounded shadow-lg mb-4 flex felx-row">
      <h3 className="text-lg basis-1/6 font-bold text-gray-900   mr-10">{taskName}</h3>
      <p className="text-gray-600 basis-1/6">{taskTime}</p>
      <div className='w-full flex justify-end text-2xl'>
        <div className='hover:cursor-pointer  hover:text-3xl' onClick={onDelete}>
          <MdDeleteOutline />
        </div>
        <div className='hover:cursor-pointer  pl-10 hover:text-3xl' onClick={togglePopup}>
          <MdModeEdit />
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 w-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-3xl mb-4 flex justify-center">Edit Task</h2>
            <form className='text-xl' onSubmit={handleSubmit} >
              <div className="mb-4">
                <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="task">
                  Task
                </label>
                <input
                  type="text"
                  id="task"
                  name="task"
                  value={updatetask}
                  placeholder="Edit the task"
                  className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setupdateTask(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="task">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  placeholder="Edit the task"
                  value={updatetime}
                  onChange={(e) => setupdateTime(e.target.value)}
                  className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-base basis-1/2 bg-[#EE4E4E] hover:bg-red-700 text-white px-4 rounded mr-2"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" text-base basis-1/2 bg-[#799351] hover:bg-[#B5C18E] text-white py-2 px-4 rounded"
                >
                  Edit Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
