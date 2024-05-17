import React, { useState , useEffect} from 'react';
import { TbPlaylistAdd } from "react-icons/tb";
import Task from './Task';


const AddTask = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [tasks,setTasks] = useState([]);
  const [id , setId] = useState(100);
  const [count,setCount] = useState(1)

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((response) => response.json())
      .then((data) => {
        const sortedTasks = data.sort((a, b) => new Date(a.time) - new Date(b.time));
        setTasks(sortedTasks);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, [count]);


  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteTask/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        console.log('Task deleted successfully');
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateTask = async (taskId, updatetask,updatetime) => {
    console.log(updatetask,updatetime,taskId)
    try {
      const response = await fetch(`http://localhost:5000/updateTask/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: updatetask, time: updatetime }), // Use an object
      });
      if (response.ok) {
        const updatedTasks = tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, task: updatetask, time: updatetime };
          }
          return task;
        });
        const sortedTasks = updatedTasks.sort((a, b) => new Date(a.time) - new Date(b.time));
        setTasks(sortedTasks);
        console.log('Task updated successfully');
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleSubmit =async (e) =>{
    e.preventDefault();
    setId(id+1);
    const newTask = {
      id: id,
      task: task,
      time: time, 
    };
    
    try {
      const response = await fetch('http://localhost:5000/Addtasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id ,task, time }),
      });
      if (response.ok) {
        console.log('Task added successfully');
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
    const updatedTasks = [...tasks, newTask];
    const sortedTasks = updatedTasks.sort((a, b) => new Date(a.time) - new Date(b.time));
    setTasks(sortedTasks);
    setShowPopup(false);
  };


  return (
    <div className='pt-10 flex flex-col'>
      <div className="flex justify-center text-5xl">
        <div className='border border-black'>
      <TbPlaylistAdd onClick={togglePopup} style={{ cursor: 'pointer' }}  className='hover:text-6xl'/>
      </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 w-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-3xl mb-4 flex justify-center">Add Task</h2>
            <form className='text-xl' onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="task">
                  Task
                </label>
                <input
                  type="text"
                  id="task"
                  name="task"
                  value={task}
                  className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your task"
                  onChange={(e) => setTask(e.target.value)}
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
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
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
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="p-6 mt-10 flex-col justify-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tasks</h2>
      <div className="grid gap-4">
        {tasks.map(task => (
          <Task 
          key={task.id}
          taskName={task.task}
          taskTime={task.time}
          onDelete={() => handleDeleteTask(task.id)}
          onUpdate= {(updatetask,updatetime) => handleUpdateTask(task.id,updatetask,updatetime)}
           />
        ))}
      </div>
    </div>
    </div>
  );
};

export default AddTask;
