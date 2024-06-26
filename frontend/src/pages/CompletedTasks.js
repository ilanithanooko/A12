import React, { useEffect, useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { BiSortAlt2 } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import tLetter from "../assets/bigLogo.png";
// Components
import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TasksForm";

// This component fetches completed tasks, 
// allows sorting and filtering, and renders the list of completed tasks along with a form to add new tasks.

const CompletedTasks = () => {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const [sortBy, setSortBy] = useState("");
  const [selectByPriority, setSortByPriority] = useState(""); // State for sorting by priority
  const [selectByType, setSortByType] = useState(""); // State for sorting by type
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`${BACKEND_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  const sortedTasks = () => {
    let sorted = [...tasks];

    if (sortBy) {
      sorted.sort((a, b) => {
        switch (sortBy) {
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          case "deadline-nearest":
            return new Date(a.deadline) - new Date(b.deadline);
          case "deadline-farthest":
            return new Date(b.deadline) - new Date(a.deadline);
          default:
            return 0;
        }
      });
    }

    if (selectByPriority) {
      sorted = sorted.filter((task) => task.priority === selectByPriority);
    }

    if (selectByType) {
      sorted = sorted.filter((task) => task.type === selectByType);
    }

    return sorted;
  };

  const clearSearch = () => {
    setSortBy("");
    setSortByPriority("");
    setSortByType("");
  };

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-slate-800 p-4">
      <div className="flex justify-between mt-4 bg-purple-50 dark:bg-slate-800 p-4 mb-3">
        <div className="flex">
          <BiSortAlt2 className="dark:fill-purple-100 fill-purple-600 inline-block w-6 h-6 mr-1 mt-2" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-purple-300 rounded p-2 text-sm lg:text-lg w-2 lg:w-40"
          >
            <option value="">Sort By...</option>
            <option value="title-asc">A-Z</option>
            <option value="title-desc">Z-A</option>
            <option value="deadline-nearest">Nearest Deadline</option>
            <option value="deadline-farthest">Farthest Deadline</option>
          </select>
        </div>

        <div className="flex gap-x-4">
          <FaFilter className="dark:fill-purple-100 fill-purple-600 inline-block w-6 h-6 -mr-1 mt-2" />
          <select
            value={selectByPriority}
            onChange={(e) => setSortByPriority(e.target.value)}
            className="border border-purple-300 rounded p-2 w-2 lg:w-40"
          >
            <option value="">Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <BiSolidCategoryAlt className="dark:fill-purple-100 fill-purple-600 inline-block w-6 h-6 -mr-1 mt-2" />
          <select
            value={selectByType}
            onChange={(e) => setSortByType(e.target.value)}
            className="border border-purple-300 rounded p-2 w-2 lg:w-40"
          >
            <option value="">Category</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="home">Home</option>
            <option value="educational">Educational</option>
          </select>
          <button
            onClick={clearSearch}
            className="px-2 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Clear
          </button>
        </div>
      </div>

      <TaskForm/>

      {sortedTasks().filter((task) => task.isCompleted).length == 0 ? (
        <div>
          <img src={tLetter} className="mx-auto" />
          {/* This is when no tasks page */}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedTasks()
            .filter((task) => task.isCompleted)
            .map((task) => (
              <div
                key={task._id}
                className="bg-violet-800 rounded-lg shadow-lg p-2"
              >
                <TaskDetails key={task._id} task={task} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CompletedTasks;
