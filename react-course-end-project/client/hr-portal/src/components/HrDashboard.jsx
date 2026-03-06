import { Link, Outlet, useNavigate } from "react-router-dom";

function HrDashboard() {
  let navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex justify-end">
        <input
          className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition"
          type="button"
          value="logout"
          onClick={() => navigate("/")}
        />
      </div>
      <h2 className="text-2xl font-bold text-center mb-10">
        Welcome HR Dashboard
      </h2>
      <div className="flex justify-center">
        <div>
          <Link
            className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition mr-2"
            to="viewEmployee"
          >
            View Employees
          </Link>
          <Link
            className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition"
            to="viewLeave"
          >
            View Leaves
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

export default HrDashboard;
