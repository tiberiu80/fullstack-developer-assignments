import axios from "axios";

let URL = "http://localhost:3000/leaveInformation";
export const viewLeaveDetails = async () => {

    try {
        const result = await axios.get(URL);
        console.log(result.data);
        return result.data;
    }catch (error) {
        console.log(error.message);
    }
}


export const createLeave = async (newLeave) => {

    try {
        const result = await axios.post(URL, newLeave);
        console.log(result.data);
        return result.data;
    }catch (error) {
        console.log(error.message);
    }
}

export const updateLeaveStatus = async (leaveId, leaveInformation) => {

    try {
        const result = await axios.put(`${URL}/${leaveId}`, leaveInformation);
        console.log(result.data);
        return result.data;
    }catch (error) {
        console.log(error.message);
    }
}