import axios from "axios";
import { Users } from "../classes/Users";
const url = "http://localhost:5000";

export async function addUser(user: Users){
    const res = await axios.post(`${url}/user/register`,user)
    return res.data;
}

export async function loginUser(credentials: { emailId: string, password: string }) {
    const res = await axios.post(`${url}/user/login`, credentials);
    return res.data; // Return the response data (token, message, etc.)
}
