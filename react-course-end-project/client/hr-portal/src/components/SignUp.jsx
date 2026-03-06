import { useState } from "react";
import { signIn, signUp } from "../service/loginService";
import { Link, useNavigate } from "react-router-dom";
import { createEmployees } from "../service/employeeService";

function SignUp() {
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [age, setAge] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  let signUpHandler = async (e) => {
    e.preventDefault();
    let result = await signIn();
    let userFound = result.find((user) => user.email === email);
    if (userFound) {
      alert("User already exists");
    } else {
      let newLogin = {
        email,
        password,
        role: "Employee",
      };
      let result1 = await signUp(newLogin);
      if (result1) {
        let newEmployee = {
          fname,
          lname,
          age,
          email,
        };
        await createEmployees(newEmployee);
        alert("Sign Up successful");
        navigate("/");
      } else {
        alert("Sign Up failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Hr-Portal Application!
        </h2>
        <h2 className="text-xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={signUpHandler}>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="text"
            placeholder="Enter your first name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="text"
            placeholder="Enter your last name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />

          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/">
            <span className="text-blue-500 cursor-pointer">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
