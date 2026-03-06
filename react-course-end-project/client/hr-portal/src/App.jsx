import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HrDashboard from "./components/HrDashboard";
import EmployeesDashboard from "./components/EmployeesDashboard";
import ViewEmployee from "./components/ViewEmployee";
import ViewProfile from "./components/ViewProfile";
import ApplyLeave from "./components/ApplyLeave";
import ViewLeave from "./components/ViewLeave";
import LeaveStatus from "./components/LeaveStatus";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/hr-dashboard"
          element={
            <ProtectedRoute>
              <HrDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="viewEmployee" element={<ViewEmployee />} />
          <Route path="viewLeave" element={<ViewLeave />} />
        </Route>
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <EmployeesDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="viewProfile" element={<ViewProfile />} />
          <Route path="applyLeave" element={<ApplyLeave />} />
          <Route path="viewLeaveStatus" element={<LeaveStatus />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
