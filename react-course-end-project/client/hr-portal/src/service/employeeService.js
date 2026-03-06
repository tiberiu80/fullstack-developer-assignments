import axios from "axios";

let URL = "http://localhost:3000/employees";
export const viewEmployees = async () => {

    try {
        const result = await axios.get(URL);
        console.log(result.data);
        return result.data;
    }catch (error) {
        console.log(error.message);
    }
}


export const createEmployees = async (newEmployee) => {

    try {
        const result = await axios.post(URL, newEmployee);
        console.log(result.data);
        return result.data;
    }catch (error) {
        console.log(error.message);
    }
}