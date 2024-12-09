import { createAction } from '@ngrx/store';
import { OutVehicle } from '../Model/vehicle.model';
import { props } from '@ngrx/store';

 export const addVehicle = createAction(
  '[Vehicle] Add Vehicle',
  props<{ vehicle: OutVehicle }>()
);

 export const addVehicleSuccess = createAction(
  '[Vehicle] Add Vehicle Success',
  props<{ vehicle: OutVehicle }>()
);

 export const addVehicleFailure = createAction(
  '[Vehicle] Add Vehicle Failure',
  props<{ error: any }>()
);

 export const updateVehicle = createAction(
  '[Vehicle] Update Vehicle',
  props<{ vehicle: OutVehicle }>()  
);

 export const updateVehicleSuccess = createAction(
  '[Vehicle] Update Vehicle Success',
  props<{ vehicle: OutVehicle }>()
);

 export const updateVehicleFailure = createAction(
  '[Vehicle] Update Vehicle Failure',
  props<{ error: any }>()
);

 export const deleteVehicle = createAction(
  '[Vehicle] Delete Vehicle',
  props<{ vehicleId: string }>()  
);

 export const deleteVehicleSuccess = createAction(
  '[Vehicle] Delete Vehicle Success',
  props<{ vehicle: OutVehicle }>()  
);

 export const deleteVehicleFailure = createAction(
  '[Vehicle] Delete Vehicle Failure',
  props<{ error: any }>()
);


//  export const loadVehicles = createAction('[Vehicle] Load Vehicles');

//  export const loadVehiclesSuccess = createAction(
//   '[Vehicle] Load Vehicles Success',
//   props<{ vehicles: OutVehicle[] }>()
// );

//  export const loadVehiclesFailure = createAction(
//   '[Vehicle] Load Vehicles Failure',
//   props<{ error: any }>()

// );


export const loadVehicles = createAction(
  '[Vehicle] Load Vehicles',
  props<{ filters?: { filters: { [key: string]: string[] } }, selectedRowCriteria?: { [key: string]: string | number } }>()
);

export const loadVehiclesSuccess = createAction(
  '[Vehicle] Load Vehicles Success',
  props<{ vehicles: OutVehicle[] }>()
);

export const loadVehiclesFailure = createAction(
  '[Vehicle] Load Vehicles Failure',
  props<{ error: any }>()
);


// export const applyFilter = createAction(
//   '[Vehicle] Apply Filter',
//   props<{ vehicleType: string; vehicleModel: string }>()
// );

// Action to apply filters
export const applyFilter = createAction(
  '[Vehicle] Apply Filter',
  props<{ vehicleType: string; vehicleModel: string }>()
);

// Action to load filtered vehicles
export const loadFilteredVehicles = createAction(
  '[Vehicle] Load Filtered Vehicles',
  props<{ filters: { vehicleType: string; vehicleModel: string } }>()
);

// Success and failure actions for filtered vehicle loading
export const loadFilteredVehiclesSuccess = createAction(
  '[Vehicle] Load Filtered Vehicles Success',
  props<{ vehicles: OutVehicle[] }>()
);

export const loadFilteredVehiclesFailure = createAction(
  '[Vehicle] Load Filtered Vehicles Failure',
  props<{ error: any }>()
);


