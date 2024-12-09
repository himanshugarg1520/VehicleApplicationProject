// export interface VehicleModel{
//     vehicleNo: number | string 
//     chasisNo: string | number 
//     modelNo: string | number | null
//     engineNo: number,
//     description: string,
//     kmDriven:'',
//     mileage: ''
// }

// export interface Vehicles{
//     vehiclelist: VehicleModel[],
//     ErrorMessage: string
// }



// export interface Manufacturer {
//     id: string; 
//     name: string;
// }

// // export interface Manufacturer {
// //     uuid: string; 
// //     manufacturerName: string;
// // }


// export interface Model {
//     id: string; 
//     name: string; 
//     manufacturerId: string; 
//     type: string
// }









 export interface Vehicle {
    uuid: string;
    vehicleRegistrationNumber: string;
    vehicleType: string;
    vehicleModel: string;
    chassisNumber: string;
    groups: string[];
    manufacturerName: string;
    engineNo: string;
    description: string;
  }
  
  export interface OutVehicle {
    vehicle: Vehicle;
    forwardingAgent: string | null;
    verificationStatus: string | null;
    trackingMode: string;
    broker: string | null;
    uuid: string | null;
    orgId: string | null;
  }
    
  
  export interface Manufacturer {
    id: string;  
    name: string
   }
  
  export interface Model {
    id: string;   
    name: string;   
    manufacturerId: string; 
    type: string; 
  }
  

//   filters: {"vehicleType":["Truck-24MT","Open _32MT"],"vehicleModel":[]}
