import React, { useState, useEffect } from "react";
import { Slots } from "../../classes/Slots";
import { getAll, updateOneSlot } from "../../model/SlotCRUD";
import { addBooking } from "../../model/bookingCRUD";
import "./Bookslot.css";
import { useNavigate } from "react-router-dom";
const moment = require("moment");

type VehicleType = "2-wheeler" | "4-wheeler";

const BookSlot: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<VehicleType>("2-wheeler");
  const [slots, setSlots] = useState<Slots[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [timeFrom, setTimeFrom] = useState<Date | string | number>();
  const [timeTo, setTimeTo] = useState<Date | string | number>();
  const [amount, setAmount] = useState<number>(0);
  const [slotId, setSlotId] = useState<string>("");
  const navigate = useNavigate();

  // Fetch available slots when the vehicleType changes
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        console.log(vehicleType);
        const availableSlots = await getAll(vehicleType);
        console.log(availableSlots);
        setSlots(availableSlots);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, [vehicleType]);

  useEffect(() => {
    if (timeFrom && timeTo) {
      const from = new Date(timeFrom).getTime();
      const to = new Date(timeTo).getTime();
      const diffInMinutes = (to - from) / 1000 / 60;
      console.log("timeDiff",diffInMinutes);
      const baseAmount = vehicleType === "2-wheeler" ? 50 : 100;
      if(diffInMinutes>0 && diffInMinutes<= 60){
        setAmount(baseAmount);
      }else{
      const additionalCharges = Math.ceil((diffInMinutes - 60) / 30) * 10;
      setAmount(baseAmount + additionalCharges);
    }
    }
  }, [timeFrom, timeTo, vehicleType]);

  // Handle slot selection
  const handleSlotSelect = (slotNo: string, slotId: string) => {
    if (slots.find((slot) => slot.slotNo === slotNo && slot.isAvailable)) {
      console.log(slotNo);
      setSelectedSlot(slotNo);
      setSlotId(slotId);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

      console.log("Selected Slot:", selectedSlot);
  console.log("Time From:", timeFrom);
  console.log("Time To:", timeTo);
  console.log("Amount:", amount);
    
    
    if (selectedSlot && timeFrom && timeTo && amount > 0) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const booking = {
          userId: userId,
          slotId: slotId,
          vehicleType: vehicleType,
          timeFrom: timeFrom,
          timeTo: timeTo,
          amount: amount, 
        };
  
        try {
          const data = await addBooking(booking);
          if (data) {
            window.alert(`Booking Confirmed!`);
            await updateOneSlot(slotId);
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Error adding booking:", error);
          window.alert("Something went wrong while booking.");
        }
      } else {
        alert("User ID not found. Please log in again.");
      }
    } else {
      alert("Please fill all the fields and select a slot.");
    }
  };

  
  return (
    <div className="book-slot-page">
      <h2>Book a Parking Slot</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Vehicle Type:</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value as VehicleType)}
          >
            <option value="2-wheeler">2-wheeler</option>
            <option value="4-wheeler">4-wheeler</option>
          </select>
        </div>

 

        <div className="form-group">
        <label>Time From:</label>
          <input
            type="datetime-local"
            value={
              timeFrom
                ? moment(timeFrom).format("YYYY-MM-DDTHH:mm"): ""
            }
            onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
              setTimeFrom(
                moment(e.target.value).toISOString()
              );
            }}
            required
          />
        </div>

        <div className="form-group">
          <label>Time To:</label>
          <input
          type="datetime-local"
            value={
              timeTo
                ? moment(timeTo).format("YYYY-MM-DDTHH:mm"): ""
            }
            onChange={( e: React.ChangeEvent<HTMLInputElement>) => {
              setTimeTo(
                moment(e.target.value).toISOString()
              );
            }}
            required
            />
        </div>

        <h3>Select a Slot</h3>
        <div className="slot-grid">
          {slots.map((slot) => (
            <div
              key={slot.slotNo}
              className={`slot ${slot.isAvailable ? "available" : "occupied"} ${
                selectedSlot === slot.slotNo ? "selected" : ""
              }`}
              onClick={() => handleSlotSelect(slot.slotNo, slot._id)}
            >
              {slot.slotNo}
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn">
          Pay Now
        </button>

        {/* <button onClick={()=>{
          addBooking();
        }} >
          Pay Now
        </button> */}
      </form>

      {amount > 0 && (
        <div className="amount-section">
          <p>Total Amount: {amount}</p>
        </div>
      )}
    </div>
  );
};

export default BookSlot;
