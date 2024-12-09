// import { createReducer, on, Action } from '@ngrx/store'; // Correct imports
// import { initialVehicleState, VehicleState } from './vehicle.state';
// import { addVehicle, addVehicleFailure, addVehicleSuccess, deleteVehicle, loadVehicles, loadVehiclesFailure, loadVehiclesSuccess, updateVehicle } from '../Actions/vehicle.action';
// import { state } from '@angular/animations';


//  export const _vehicleReducer = createReducer(
//   initialVehicleState,

//    on(addVehicle, (state, { vehicle }) => {
//         if (state.vehicles.some((v) => v.uuid === vehicle.uuid)) {
//             return state;  
//         }
//         return {
//             ...state,
//             vehicles: [vehicle, ...state.vehicles],
//         };
//     }),
    

//     on(addVehicleSuccess, (state, { vehicle }) => ({
//         ...state,
//         vehicles: [...state.vehicles, vehicle], 
//       })),

//     on(addVehicleFailure, (state, { error }) => ({
//         ...state,
//         error
//     })),

//    on(updateVehicle, (state, { vehicle }) => ({
//         ...state,
//         vehicles: state.vehicles.map((v) => (v.uuid  === vehicle.uuid ? vehicle : v)),
//     })),

//     on(deleteVehicle, (state, { vehicleId }) => {
//         return {
//           ...state,
//           vehicles: state.vehicles.filter((vehicle) => vehicle.uuid !== vehicleId), 
//         };
//       }),
      
//     on(loadVehicles, (state) => ({
//         ...state,
//         vehicles: state.vehicles,
//     })),

//    on(loadVehiclesSuccess, (state, { vehicles }) => ({
//         ...state,
//         vehicles,
//         error: null
//     })),

//     on(loadVehiclesFailure, (state,{error})=>({
//         ...state,
//         error
//     }))

// );

// export function vehicleReducer(state: VehicleState | undefined, action: Action) {
//   return _vehicleReducer(state, action); 
// }







import { createReducer, on } from '@ngrx/store';
import * as VehicleActions from '../Actions/vehicle.action';
import { OutVehicle } from '../Model/vehicle.model';

export interface VehicleState {
  vehicles: OutVehicle[]; // List of vehicles
  selectedRowCriteria?: { [key: string]: string | number }; // Selected row criteria
  selectedType: string; // Selected vehicle type
  selectedModel: string; // Selected vehicle model
  filters: { vehicleType: string; vehicleModel: string }; // Filters for vehicles
}

export const initialState: VehicleState = {
  vehicles: [],
  selectedRowCriteria: undefined,
  selectedType: '',
  selectedModel: '',
  filters: { vehicleType: '', vehicleModel: '' },
};

export const vehicleReducer = createReducer(
  initialState,

   on(VehicleActions.loadVehicles, (state, { filters, selectedRowCriteria }) => ({
    ...state,
    // filters: filters || state.filters,
    selectedRowCriteria: selectedRowCriteria || state.selectedRowCriteria,
  })),

   on(VehicleActions.loadVehiclesSuccess, (state, { vehicles }) => ({
    ...state,
    vehicles,
  })),

   on(VehicleActions.addVehicleSuccess, (state, { vehicle }) => ({
    ...state,
    vehicles: [vehicle, ...state.vehicles],
  })),

   on(VehicleActions.updateVehicle, (state, { vehicle }) => ({
    ...state,
    vehicles: state.vehicles.map((v) => (v.uuid === vehicle.uuid ? vehicle : v)),
  })),

   on(VehicleActions.deleteVehicle, (state, { vehicleId }) => ({
    ...state,
    vehicles: state.vehicles.filter((v) => v.uuid !== vehicleId),
  })),

//    on(VehicleActions.applyFilter, (state, { vehicleType, vehicleModel }) => ({
//     ...state,
//     filters: { vehicleType, vehicleModel },
//     vehicles: state.vehicles.filter(
//       (vehicle) =>
//         (vehicleType ? vehicle.vehicle.vehicleType === vehicleType : true) &&
//         (vehicleModel ? vehicle.vehicle.vehicleModel === vehicleModel : true)
//     ),
//   }))
on(VehicleActions.applyFilter, (state, { vehicleType, vehicleModel }) => ({
    ...state,
    filters: { vehicleType, vehicleModel },
  })),

  // Store the filtered vehicles when loadFilteredVehiclesSuccess is dispatched
  on(VehicleActions.loadFilteredVehiclesSuccess, (state, { vehicles }) => ({
    ...state,
    vehicles,
  })),
);
