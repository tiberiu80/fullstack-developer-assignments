import { Link, Outlet, useNavigate } from "react-router-dom";

function EmployeesDashboard() {

let navigate = useNavigate();
let employeeEmail = localStorage.getItem("employeeEmail");

    return(
        <>
        <input type="button" value="Logout"
        onClick={()=>{
            localStorage.removeItem("employeeEmail");
            navigate("/");
        }}/>
        <h2>Employees Dashboard</h2>
        <p>Welcome, {employeeEmail.includes("@") ? employeeEmail.split("@")[0] : employeeEmail}</p>
        <Link to="viewProfile">View Profile</Link> |  
        <Link to="applyLeave">Apply Leave</Link> |
        <Link to="viewLeaveStatus">View Leave Status</Link> |    
        <div>
            {/*      <!-- This is where the nested routes will be rendered --> */}
            <Outlet />
        </div>
        </>
    )
}

export default EmployeesDashboard