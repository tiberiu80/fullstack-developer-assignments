import { useEffect, useState } from "react";
import { viewEmployees } from "../service/employeeService";
import { createLeave } from "../service/leaveService";

function ApplyLeave() {
  let [numberOfLeaves, setNumberOfLeaves] = useState("");
  let [reasonForLeave, setReasonForLeave] = useState("");
  let [status, setStatus] = useState("pending");
  let [msg, setMessage] = useState("");
  let employeeEmail = localStorage.getItem("employeeEmail");

  let applyLeaveInfo = async (e) => {
    e.preventDefault();
    try {
      let leaveInfo = {
        employeeEmail,
        numberOfLeaves,
        reasonForLeave,
        status,
      };
      await createLeave(leaveInfo);
      setMessage("Leave applied successfully");
      setNumberOfLeaves("");
      setReasonForLeave("");
    } catch (error) {
      console.log(error.message);
      setMessage("Failed to apply leave");
    }
  };
  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-6">Apply Leave</h1>
        <form onSubmit={applyLeaveInfo}>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="number"
            placeholder="Number of Leaves"
            value={numberOfLeaves}
            onChange={(e) => setNumberOfLeaves(e.target.value)}
            required
          />
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="text"
            placeholder="Reason for Leave"
            value={reasonForLeave}
            onChange={(e) => setReasonForLeave(e.target.value)}
            required
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeave;
