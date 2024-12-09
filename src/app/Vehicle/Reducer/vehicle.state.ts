
// import { Vehicle } from "../Model/vehicle.model";
// ''
// export interface VehicleState {
//   vehicles: Vehicle[];
//   selectedVehicle: Vehicle | null;
//   error: string | null;
// }

// export const initialVehicleState: VehicleState = {
//   vehicles: [],
//   selectedVehicle: null,
//   error: null,
// };


// vehicle.state.ts


import { OutVehicle, Vehicle } from "../Model/vehicle.model";

export interface VehicleState {
  vehicles: OutVehicle[];          
  selectedVehicle: OutVehicle | null;  
  error: string | null;   
  selectedType: string | null;
  selectedModel: string | null;
  filters: {                        // Active filters for vehicle type and model
    vehicleType: string;
    vehicleModel: string;
  };

}

export const initialVehicleState: VehicleState = {
  vehicles: [],
  selectedVehicle: null,  
  error: null,
  selectedType: null,
  selectedModel: null,
  filters: {
    vehicleType: '',
    vehicleModel: '',
  },

};



export interface VehicleResponse {
  data: Vehicle[];
}
