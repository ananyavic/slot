import axios from "axios";
import { Bookings } from "../classes/Booking";
const url = "http://localhost:5000";
// const token = window.localStorage.getItem('token')


export async function addBooking(booking: Bookings){
    const res = await axios.post(`${url}/bookings/add`,booking)
    return res.data;

}

// export async function fetchStat(timeRange: string, year: number){
//     const res = await axios.get(`${url}/bookings/stats?timeRange=${timeRange}&year=${year}`,{
//         headers:{
//             Authorization:`Bearer ${token}`
//         }
//     } )
//     return res.data;
// }