type VehicleType = '2-wheeler' | '4-wheeler';
export class Bookings{
    userId: string;
    slotId: string;
    vehicleType: VehicleType; 
    timeFrom: Date | string | number;
    timeTo: Date | string | number;
    amount: number;

    constructor(
        userId: string,
        slotId: string,
        vehicleType: VehicleType, 
        timeFrom: Date | string | number,
        timeTo: Date | string |number,
        amount: number,
    ){
        this.userId = userId;
        this.slotId= slotId;
        this.vehicleType = vehicleType;
        this.timeFrom = timeFrom;
        this.timeTo= timeTo;
        this.amount = amount;
    }


}