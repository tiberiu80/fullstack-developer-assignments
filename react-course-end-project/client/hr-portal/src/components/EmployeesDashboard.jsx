import { Link, Outlet, useNavigate } from "react-router-dom";

function EmployeesDashboard() {
  let navigate = useNavigate();
  let employeeEmail = localStorage.getItem("employeeEmail");

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex justify-end">
        <input
          className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition"
          type="button"
          value="Logout"
          onClick={() => {
            localStorage.removeItem("employeeEmail");
            navigate("/");
          }}
        />
      </div>
      <h2 className="text-2xl font-bold text-center mb-10">
        Employees Dashboard
      </h2>
      <p className="text-center text-xl mb-10">
        Welcome,{" "}
        <span className="text-blue-500">
          {employeeEmail.includes("@")
            ? employeeEmail.split("@")[0]
            : employeeEmail}
        </span>
      </p>
      <div className="flex justify-center">
        <div>
          <Link
            className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition mr-2"
            to="viewProfile"
          >
            View Profile
          </Link>
          <Link
            className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition mr-2"
            to="applyLeave"
          >
            Apply Leave
          </Link>
          <Link
            className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition"
            to="viewLeaveStatus"
          >
            View Leave Status
          </Link>
        </div>
      </div>
      <div>
        {/*      <!-- This is where the nested routes will be rendered --> */}
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeesDashboard;
