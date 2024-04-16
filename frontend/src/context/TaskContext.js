import { createContext, useReducer } from "react";

// Create tasks context
export const TasksContext = createContext()

// Reducer function to handle tasks state changes
export const tasksReducer = (state, action) => {
    switch (action.type) {
      case 'SET_TASKS':
        return {
          tasks: action.payload || state.tasks // Handle initial state if payload is null
        };
  
      case 'CREATE_TASK':
        return {
          tasks: [action.payload, ...state.tasks]
        };
  
      case 'DELETE_TASK':
        return {
          tasks: state.tasks.filter((w) => w._id !== action.payload._id)
        };

      case 'UPDATE_TASK':
        const updatedTasks = state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        );
        return {
          tasks: updatedTasks
        };

      case 'RESET_TASKS':
        return {
          tasks: [],
        };

  
      default:
        return state;
    }
  };
  
  // TasksContextProvider component to manage tasks state
  export const TasksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tasksReducer, {
      tasks: [] // Set initial state with an empty array
    });
  
    return (
      <TasksContext.Provider value={{ ...state, dispatch }}>
        {children}
      </TasksContext.Provider>
    );
};
  