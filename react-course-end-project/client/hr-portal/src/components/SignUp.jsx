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
    let userFound  = result.find((user) => user.email === email);
    if(userFound) {
        alert("User already exists");
    }else {
        let newLogin = {
            email,
            password,
            role: "Employee"
        }
        let result1 = await signUp(newLogin);
        if(result1) {
            let newEmployee = {
                fname,
                lname,
                age,
                email
            }
            await createEmployees(newEmployee);
            alert("Sign Up successful");
            navigate("/");
        }else {
            alert("Sign Up failed");
        }
    }
}

    return(
        <>
        <h2>Sign Up Page</h2>
        <form onSubmit={signUpHandler}>
            <input type="text" placeholder='Enter your first name' 
                value={fname} onChange={(e) => setFname(e.target.value)} /><br/>
            <input type="text" placeholder='Enter your last name' 
                value={lname} onChange={(e) => setLname(e.target.value)} /><br/>
            <input type="number" placeholder='Enter your age' 
                value={age} onChange={(e) => setAge(e.target.value)} /><br/>
                <input type="email" placeholder='Enter your email' 
                value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
                <input type="password" placeholder='Enter your password' 
            value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
            <button type="submit">Sign Up</button>
        </form>
        <Link to="/">Already have an account? Login</Link>
        </>
    )
}

export default SignUp