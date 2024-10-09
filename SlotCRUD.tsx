import axios from "axios";
const url = "http://localhost:5000";

const token = window.localStorage.getItem('token')

type VehicleType = '2-wheeler' | '4-wheeler';

export async function getAll(vehicleType: VehicleType) {
    const res = await axios.get(`${url}/slots/getall?vehicleType=${vehicleType}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return res.data;
}

export async function updateOneSlot(slotId: string) {
    const res = await axios.put(`${url}/slots/update/${slotId}`)
    console.log(res.data);
    return res.data;
    
}