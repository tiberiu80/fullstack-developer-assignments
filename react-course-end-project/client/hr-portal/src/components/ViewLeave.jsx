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
    <div>
      <h1>View Leave</h1>
      <table border={1}>
        <thead>
          <tr>
            <th>Employee Email</th>
            <th>Number of Leaves</th>
            <th>Reason for Leave</th>

            <th>Approved</th>
            <th>Rejected</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.employeeEmail}</td>
              <td>{leave.numberOfLeaves}</td>
              <td>{leave.reasonForLeave}</td>
              <td>
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
              <td>
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
