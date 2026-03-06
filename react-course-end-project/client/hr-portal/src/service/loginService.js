import axios from "axios";

let URL = "http://localhost:3000/logins";
export const signIn = async () => {

    try {
        const result = await axios.get(URL);
        console.log(result.data);
        return result.data;
    }catch (error) {
        console.log(error.message);
    }
}

export const signUp = async (newUser) => {

    // post 
    // url and data (newUser)
    try {
        const result = await axios.post(URL, newUser);
        console.log(result.data);
        return result.data;
    }catch (error) {
        console.log(error.message);
    }
}