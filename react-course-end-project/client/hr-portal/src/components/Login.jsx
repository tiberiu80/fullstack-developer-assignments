import { useState } from "react";
import { signIn } from "../service/loginService";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let navigate = useNavigate();
  let signInHandler = async (e) => {
    e.preventDefault();
    let result = await signIn();
    console.log(email, password, role);
    let user = result.find(
      (user) =>
        user.email === email &&
        user.password === password &&
        user.role === role,
    );
    console.log(user);
    if (user && role === "hr") {
      // alert("Login successful");
      localStorage.setItem("employeeEmail", email);
      navigate("/hr-dashboard");
    } else if (user && role === "Employee") {
      localStorage.setItem("employeeEmail", email);
      navigate("/employee-dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Hr-Portal Application!
        </h2>
        <h2 className="text-xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={signInHandler}>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 "
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">--Select Role--</option>
            <option value="hr">HR</option>
            <option value="Employee">Employee</option>
          </select>
          <br />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-blue-500 cursor-pointer">Sign up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
