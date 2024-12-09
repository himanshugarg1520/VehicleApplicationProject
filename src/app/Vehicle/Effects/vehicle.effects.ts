// import { Injectable } from '@angular/core';
// import { Actions, ofType, createEffect } from '@ngrx/effects';
// import { catchError, mergeMap, switchMap } from 'rxjs/operators';
//  import { VehicleService } from '../Services/vehicle.service';
// import * as VehicleActions from '../Actions/vehicle.action'
// import { of } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class VehicleEffects {

//   constructor(private actions$: Actions, private vehicleService: VehicleService) {}

//   loadVehicles$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(VehicleActions.loadVehicles),
//       mergeMap(() =>
//         this.vehicleService.getVehicles().pipe(
//           map(vehicles => VehicleActions.loadVehiclesSuccess({ vehicles })),
//           catchError(error => of(VehicleActions.loadVehiclesFailure({ error })))
//         )
//       )
//     )
//   ); 
  
//  addVehicle$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(VehicleActions.addVehicle),  
//       mergeMap((action) => 
//         this.vehicleService.addVehicle(action.vehicle).pipe( 
//           map((vehicle) => VehicleActions.addVehicleSuccess({ vehicle })),  
//           catchError((error) => of(VehicleActions.addVehicleFailure({ error }))) 
//         )
//       )
//     )
//   );

// }


import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, filter } from 'rxjs/operators';
import * as VehicleActions from '../Actions/vehicle.action';  // Corrected import
import { VehicleService } from '../Services/vehicle.service';
import { OutVehicle, Vehicle } from '../Model/vehicle.model';

@Injectable()
export class VehicleEffects {

  constructor(
    private actions$: Actions,
    private vehicleService: VehicleService
  ) {}



  
//   loadVehicles$ = createEffect(() => 
//   this.actions$.pipe(
//     ofType(VehicleActions.loadVehicles),
//     switchMap(() => 
//       this.vehicleService.getVehicles().pipe(
//         map((vehicles: Vehicle[]) => {
//           const outVehicles: OutVehicle[] = vehicles.map(vehicle => ({
//             vehicle: {
//               uuid: vehicle.uuid,
//               vehicleRegistrationNumber: vehicle.vehicleRegistrationNumber,
//               vehicleType: vehicle.vehicleType,
//               vehicleModel: vehicle.vehicleModel,
//               chassisNumber: vehicle.chassisNumber,
//               groups: vehicle.groups,
//               manufacturerName: vehicle.manufacturerName,
//               engineNo: vehicle.engineNo,
//               description: vehicle.description,
//             },
//             forwardingAgent: null, 
//             verificationStatus: null,  
//             trackingMode: 'active',  
//             broker: null,  
//             uuid: vehicle.uuid,   
//             orgId: null,
//           }));
          
//           return VehicleActions.loadVehiclesSuccess({ vehicles: outVehicles });
//         }),
//         catchError(error => 
//           of(VehicleActions.loadVehiclesFailure({ error }))   
//         )
//       )
//     )
//   )
// );




  // loadVehicles$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(VehicleActions.loadVehicles),
  //     switchMap(({ filters, selectedRowCriteria }) => {
  //       const normalizedFilters = filters && 'filters' in filters ?  filters.filters : filters;

  //       return this.vehicleService.getVehicles(normalizedFilters, selectedRowCriteria).pipe(
  //         map((vehicles: Vehicle[]) => {

  //           const outVehicles: OutVehicle[] = vehicles.map(vehicle => ({
  //             vehicle: {
  //               uuid: vehicle.uuid,
  //               vehicleRegistrationNumber: vehicle.vehicleRegistrationNumber,
  //               vehicleType: vehicle.vehicleType,
  //               vehicleModel: vehicle.vehicleModel,
  //               chassisNumber: vehicle.chassisNumber,
  //               groups: vehicle.groups,
  //               manufacturerName: vehicle.manufacturerName,
  //               engineNo: vehicle.engineNo,
  //               description: vehicle.description,
  //             },
  //             forwardingAgent: null,
  //             verificationStatus: null,
  //             trackingMode: 'active',
  //             broker: null,
  //             uuid: vehicle.uuid,
  //             orgId: null,
  //           }));

  //           return VehicleActions.loadVehiclesSuccess({  vehicles: outVehicles });

  //         }),
  //         catchError((error) =>
  //           of(VehicleActions.loadVehiclesFailure({ error }))
  //         )
  //       );
  //     })
  //   )
  // );






  loadVehicles$ = createEffect(() =>
  this.actions$.pipe(
    ofType(VehicleActions.loadVehicles),
    switchMap(({ filters, selectedRowCriteria }) => {
      // Normalize the filters if needed
      const normalizedFilters = filters && 'filters' in filters ? filters.filters : filters;

      const finalFilters = {
        ...normalizedFilters,
        vehicleType: selectedRowCriteria ? [String(selectedRowCriteria['selectedType'])] : [],  
        vehicleModel: selectedRowCriteria ? [String(selectedRowCriteria['selectedModel'])] : [], 
       };

      return this.vehicleService.getVehicles(finalFilters, selectedRowCriteria).pipe(
        map((vehicles: Vehicle[]) => {
          const outVehicles: OutVehicle[] = vehicles.map(vehicle => ({
            vehicle: {
              uuid: vehicle.uuid,
              vehicleRegistrationNumber: vehicle.vehicleRegistrationNumber,
              vehicleType: vehicle.vehicleType,
              vehicleModel: vehicle.vehicleModel,
              chassisNumber: vehicle.chassisNumber,
              groups: vehicle.groups,
              manufacturerName: vehicle.manufacturerName,
              engineNo: vehicle.engineNo,
              description: vehicle.description,
            },
            forwardingAgent: null,
            verificationStatus: null,
            trackingMode: 'active',
            broker: null,
            uuid: vehicle.uuid,
            orgId: null,
          }));

          return VehicleActions.loadVehiclesSuccess({ vehicles: outVehicles });
        }),
        catchError((error) =>
          of(VehicleActions.loadVehiclesFailure({ error }))
        )
      );
    })
  )
);


   addVehicle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VehicleActions.addVehicle),
      switchMap((action) => {
         const vehicleToAdd: Vehicle = {
          uuid: action.vehicle.vehicle.uuid, // Vehicle UUID
          vehicleRegistrationNumber: action.vehicle.vehicle.vehicleRegistrationNumber,
          vehicleType: action.vehicle.vehicle.vehicleType,
          vehicleModel: action.vehicle.vehicle.vehicleModel,
          chassisNumber: action.vehicle.vehicle.chassisNumber,
          manufacturerName: action.vehicle.vehicle.manufacturerName,
          engineNo: action.vehicle.vehicle.engineNo,
          description: action.vehicle.vehicle.description,
          groups: action.vehicle.vehicle.groups,
          // forwardingAgent: action.vehicle.forwardingAgent,
          // verificationStatus: action.vehicle.verificationStatus,
          // trackingMode: action.vehicle.trackingMode,
          // broker: action.vehicle.broker,
          // orgId: action.vehicle.orgId
        };

        return this.vehicleService.addVehicle(vehicleToAdd).pipe(
          map((addedVehicle) => {
            return VehicleActions.addVehicleSuccess({ vehicle: addedVehicle });
          }),
          catchError((error) =>
            of(VehicleActions.addVehicleFailure({ error }))
          )
        );
      })
    )
  );





  // Effect to update vehicle details
  // updateVehicle$ = createEffect(() => 
  //   this.actions$.pipe(
  //     ofType(VehicleActions.updateVehicle),
  //     switchMap((action) => 
  //       this.vehicleService.updateVehicle(action.vehicleId, action.updateVehicle).pipe(
  //         map((updatedVehicle: Vehicle) => {
  //           return VehicleActions.updateVehicleSuccess({ vehicle: updatedVehicle });
  //         }),
  //         catchError(error => 
  //           of(VehicleActions.updateVehicleFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );

  // // Effect to delete a vehicle
  // deleteVehicle$ = createEffect(() => 
  //   this.actions$.pipe(
  //     ofType(VehicleActions.deleteVehicle),
  //     switchMap((action) => 
  //       this.vehicleService.deleteVehicle(action.vehicleId).pipe(
  //         map(() => {
  //           return VehicleActions.deleteVehicleSuccess({ vehicleId: action.vehicleId });
  //         }),
  //         catchError(error => 
  //           of(VehicleActions.deleteVehicleFailure({ error }))
  //         )
  //       )
  //     )
  //   )
  // );
}
