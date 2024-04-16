import React from 'react'
import Navbar from './Navbar'
import { useAuthContext } from "../hooks/useAuthContext";
import { Routes, Route } from "react-router-dom";
import MyTasks from "../pages/MyTasks";
import CalendarPage from "../pages/CalendarPage";
import CompletedTasks from "../pages/CompletedTasks";
import SharedDoc from '../pages/SharedDoc';

// Dashboard Component
// Renders the main dashboard layout including navigation bar and routes for different pages.

const Dashboard = ({sideBarToggle, setSideBarToggle}) => {
  const { user } = useAuthContext();

  return (
    <div className={`${sideBarToggle ? "" : " lg:ml-64 "} mt-14 w-full`}> {/* this is the main compartment */}
      {user && <Navbar
        sideBarToggle={sideBarToggle}
        setSideBarToggle={setSideBarToggle}/>
      }
      <Routes>
        <Route
          path='/'
          element={<MyTasks/>}
        />
        <Route
          path='/mytasks'
          element={<MyTasks />}
        />
        <Route
          path='/completed-tasks'
          element={<CompletedTasks />}
        />
        <Route
          path='/calendar'
          element={<CalendarPage />}
        />
        <Route
          path='/shareddoc'
          element={<SharedDoc />}
        />
      </Routes>

    </div>
  )
}

export default Dashboard