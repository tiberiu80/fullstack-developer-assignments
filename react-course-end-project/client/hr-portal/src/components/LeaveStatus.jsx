import { useEffect, useState } from "react";
import { viewLeaveDetails } from "../service/leaveService";

function LeaveStatus() {
  const [leaves, setLeaves] = useState([]);

  let employeeEmail = localStorage.getItem("employeeEmail");

  const loadLeaves = async () => {
    try {
      const result = await viewLeaveDetails();
      console.log("leaves: ", result);
      setLeaves(
        result.filter((leave) => leave.employeeEmail === employeeEmail),
      );
    } catch (error) {
      console.log("error: ", error);
    }
  };

  console.log("employeeEmail: ", employeeEmail);
  console.log("state leaves: ", leaves);

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <div>
      <h3>View leave status</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Employee Email</th>
            <th>Number of Leaves</th>
            <th>Reason for Leave</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.employeeEmail}</td>
              <td>{leave.numberOfLeaves}</td>
              <td>{leave.reasonForLeave}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaveStatus;
