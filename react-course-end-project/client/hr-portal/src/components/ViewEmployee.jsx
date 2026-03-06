import { useEffect, useState } from "react";
import { viewEmployees } from "../service/employeeService";

function ViewEmployee() {
let [employees,setEmployees] = useState([]);

let loadEmployees = async () => {
    try {
        const result = await viewEmployees();
        setEmployees(result);
    } catch (error) {
        console.log(error.message);
    }
}

useEffect(()=> {
    loadEmployees();
}, [])
    return(
        <div>
            <h1>View Employee</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>FName</th>
                        <th>LName</th>
                        <th>Age</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.fname}</td>
                            <td>{employee.lname}</td>
                            <td>{employee.age}</td>
                            <td>{employee.email}</td>  
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ViewEmployee;    