import { useEffect, useState } from "react";
import { viewEmployees } from "../service/employeeService";
import { updateLeaveStatus, viewLeaveDetails } from "../service/leaveService";

function ViewLeave() {
  let [leaves, setLeaves] = useState([]);
  let [msg, setMessage] = useState("");
  let loadLeaves = async () => {
    try {
      const result = await viewLeaveDetails();
      //show only those leaves which are pending for approval or rejection
      setLeaves(result.filter((leave) => leave.status === "pending"));
    } catch (error) {
      console.log(error.message);
    }
  };

  let changeLeaveStatus = async (leaveId, leaveInfo) => {
    try {
      // console.log(`Leave ID: ${leaveId}`);
      // console.log(leaveInfo);
      let result = await updateLeaveStatus(leaveId, leaveInfo);
      setMessage(result);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    loadLeaves();
  }, [msg]);
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
              Approved
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Rejected
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
                <input
                  type="radio"
                  name={`status-${leave.id}`}
                  onClick={() =>
                    changeLeaveStatus(leave.id, {
                      ...leave,
                      status: "approved",
                    })
                  }
                />
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                <input
                  type="radio"
                  name={`status-${leave.id}`}
                  onClick={() =>
                    changeLeaveStatus(leave.id, {
                      ...leave,
                      status: "rejected",
                    })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewLeave;
