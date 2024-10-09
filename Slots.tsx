type VehicleType = '2-wheeler' | '4-wheeler';
export class Slots{
    _id:string = '';
    slotNo: string;
    isAvailable: Boolean;
    vehicleType: VehicleType; 
    constructor(
        slotNo: string,
        isAvailable: Boolean,
        vehicleType: VehicleType,

    ){
        this.slotNo = slotNo;
        this.isAvailable = isAvailable;
        this.vehicleType = vehicleType;

    }
}






