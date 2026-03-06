import { useEffect, useState } from "react";
import { viewEmployees } from "../service/employeeService";

function ViewEmployee() {
  let [employees, setEmployees] = useState([]);

  let loadEmployees = async () => {
    try {
      const result = await viewEmployees();
      setEmployees(result);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);
  return (
    <div className="mt-10">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              FName
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              LName
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Age
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr
              key={employee.id}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50 transition`}
            >
              <td className="px-6 py-4 text-sm text-gray-800">
                {employee.fname}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {employee.lname}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {employee.age}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {employee.email}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewEmployee;
