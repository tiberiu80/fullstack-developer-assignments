import { useEffect, useState } from "react";
import { viewLeaveDetails } from "../service/leaveService";

function LeaveStatus() {
  const [leaves, setLeaves] = useState([]);

  let employeeEmail = localStorage.getItem("employeeEmail");

  const loadLeaves = async () => {
    try {
      const result = await viewLeaveDetails();
      setLeaves(
        result.filter((leave) => leave.employeeEmail === employeeEmail),
      );
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <div className="mt-10">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Employee Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Number of Leaves
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Reason for Leave
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave, index) => (
            <tr
              key={leave.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50 transition`}
            >
              <td className="px-6 py-4 text-sm text-gray-800">
                {leave.employeeEmail}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {leave.numberOfLeaves}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {leave.reasonForLeave}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {leave.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveStatus;
