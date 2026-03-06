import { useEffect, useState } from "react";
import { viewEmployees } from "../service/employeeService";
import { createLeave } from "../service/leaveService";

function ApplyLeave() {
let [numberOfLeaves,setNumberOfLeaves] = useState("");
let [reasonForLeave,setReasonForLeave] = useState("");
let [status,setStatus] = useState("pending");
let [msg,setMessage]=useState("");
let employeeEmail = localStorage.getItem("employeeEmail");

let applyLeaveInfo = async (e) => {
    e.preventDefault();
    try{
        let leaveInfo = {
            employeeEmail,
            numberOfLeaves,
            reasonForLeave,
            status
        }
        await createLeave(leaveInfo);
        setMessage("Leave applied successfully");
        setNumberOfLeaves("");
        setReasonForLeave("");

    }catch(error){
        console.log(error.message)
        setMessage("Failed to apply leave")
    }
}
    return(
        <div>
            <h1>Apply Leave</h1>
           <form onSubmit={applyLeaveInfo}>
            <input type="number" placeholder="Number of Leaves" value={numberOfLeaves} onChange={(e) => setNumberOfLeaves(e.target.value)} required/><br/><br/>
            <input type="text" placeholder="Reason for Leave" value={reasonForLeave} onChange={(e) => setReasonForLeave(e.target.value)} required/><br/><br/>
            <button type="submit">Submit</button>
           </form>
        </div>
    )
}

export default ApplyLeave;    