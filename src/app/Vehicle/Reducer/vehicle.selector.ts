// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { VehicleState } from './vehicle.state';

// export const selectVehicleState = createFeatureSelector<VehicleState>('vehicle');

// export const selectAllVehicles = createSelector(
//     selectVehicleState, (state) => state.vehicles
// );

// export const selectVehicleById = (vehicleId: string) =>
//     createSelector(selectVehicleState, (state) =>
//         state.vehicles.find((v) => v.uuid === vehicleId) || null
//     );

// export const selectVehicleError = createSelector(
//     selectVehicleState,
//     (state) => state.error
// );





// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { VehicleState } from './vehicle.state';

// export const selectVehicleState = createFeatureSelector<VehicleState>('vehicle');

// export const selectAllVehicles = createSelector(
//     selectVehicleState, (state) => state.vehicles
// );

// export const selectVehicleById = (vehicleId: string) =>
//     createSelector(selectVehicleState, (state) =>
//         state.vehicles.find((v) => v.vehicle.uuid === vehicleId) || null
//     );

// export const selectVehicleError = createSelector(
//     selectVehicleState,
//     (state) => state.error
// );




import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VehicleState } from './vehicle.state';  // Import VehicleState

export const selectVehicleState = createFeatureSelector<VehicleState>('vehicle');

// Selector to get all vehicles
export const selectAllVehicles = createSelector(
  selectVehicleState, 
  (state: VehicleState) => state.vehicles
);

// Selector to get a specific vehicle by ID
export const selectVehicleById = (vehicleId: string) =>
  createSelector(selectVehicleState, (state: VehicleState) =>
    state.vehicles.find((v) => v.vehicle.uuid === vehicleId) || null
  );

// Selector for vehicle errors
// export const selectVehicleError = createSelector(
//   selectVehicleState,
//   (state: VehicleState) => state.error
// );

// // Selector to get filtered vehicles based on type and model
// export const selectFilteredVehicles = createSelector(
//   selectVehicleState,
//   (state: VehicleState) => {
//     return state.vehicles.filter(outVehicle => 
//       (state.selectedType ? outVehicle.vehicle.vehicleType === state.selectedType : true) &&
//       (state.selectedModel ? outVehicle.vehicle.vehicleModel === state.selectedModel : true)
//     );
//   }
// );



// export const selectFilteredVehicles = createSelector(
//   selectVehicleState,
//   (state: VehicleState) => state.filteredVehicles
// );

export const selectVehicleFilters = createSelector(
    selectVehicleState,
    (state: VehicleState) => state.filters
  );
  
  // Selector to get filtered vehicles based on filters in the state
  export const selectFilteredVehicles = createSelector(
    selectAllVehicles,
    selectVehicleFilters,
    (vehicles, filters) =>
      vehicles.filter((outVehicle) =>
        (filters.vehicleType ? outVehicle.vehicle.vehicleType === filters.vehicleType : true) &&
        (filters.vehicleModel ? outVehicle.vehicle.vehicleModel === filters.vehicleModel : true)
      )
  );
  
  // Selector for vehicle errors
  export const selectVehicleError = createSelector(
    selectVehicleState,
    (state: VehicleState) => state.error
  );


