

//  import { MatDialog } from '@angular/material/dialog';
// import { Vehicle } from '../../Model/vehicle.model';
// import { Store } from '@ngrx/store';
// import { Observable, Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { selectAllVehicles, selectVehicleError } from '../../Reducer/vehicle.selector';
// import { addVehicle, deleteVehicle, loadVehicles, updateVehicle } from '../../Actions/vehicle.action';
// import { AddvehicleComponent } from '../addvehicle/addvehicle.component';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { OutVehicle } from '../../Model/vehicle.model';
// import { VehicleService } from '../../Services/vehicle.service';
// import { FilterdialogComponent } from '../filterdialog/filterdialog.component';
// import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

// @Component({
//   selector: 'app-vehicle',
//   templateUrl: './vehicle.component.html',
//   styleUrls: ['./vehicle.component.css'],
// })
// export class VehicleComponent implements OnInit, OnDestroy {
//   vehicles$: Observable<OutVehicle[]>;  // Expecting OutVehicle[] type
//   vehicleError$: Observable<string | null>;
//   dataSource: { data: OutVehicle[] } = { data: [] };  // Ensure this is typed as OutVehicle[]
//   displayedColumns: string[] = ['vehicleRegistrationNumber', 'vehicleType', 'vehicleModel']; // Example columns
//   private unsubscribe$ = new Subject<void>();
//   @Input() searchTerm: string = '';
//   filteredVehicles: OutVehicle[] = []; // Change to OutVehicle[]
//   // filterCriteria: { vehicleType?: string, modelNo?: string } = {}; 
//   filterCriteria: { [key: string]: string | undefined } = {};


//   constructor(
//     private store: Store,
//     private dialog: MatDialog,
//     private snakbar: MatSnackBar,
//     private vehicleService: VehicleService,
//   ) {
//     this.vehicles$ = this.store.select(selectAllVehicles);
//     this.vehicleError$ = this.store.select(selectVehicleError);
//   }

//   ngOnInit(): void {
//     this.refreshVehicles();  // Initially load all vehicles

//     this.vehicleError$
//       .pipe(takeUntil(this.unsubscribe$))
//       .subscribe((errorMessage) => {
//         if (errorMessage) {
//           console.error('Error:', errorMessage);
//           this.showErrorMessage(errorMessage);
//         }
//       });
//   }

//   refreshVehicles(): void {
//      const transformedFilters = {
//       filters: Object.keys(this.filterCriteria).reduce((acc, key) => {
//         const value = this.filterCriteria[key];  
//         if (value) {
//           acc[key] = [value];  
//         }
//         return acc;
//       }, {} as { [key: string]:  string[] }),
//     };
  
//     this.store.dispatch(loadVehicles({  filters: transformedFilters }));
  
//     this.vehicles$
//       .pipe(takeUntil(this.unsubscribe$))
//       .subscribe((vehicles: OutVehicle[]) => {
//         if (vehicles) {
//           if (this.filterCriteria['vehicleType'] || this.filterCriteria['modelNo']) {
//              this.filteredVehicles = vehicles.filter((outVehicle) => {

//               const matchesVehicleType = this.filterCriteria['vehicleType']
//                 ? outVehicle.vehicle.vehicleType?.toLowerCase().includes(this.filterCriteria['vehicleType']!.toLowerCase())
//                 : true;
  
//               const matchesVehicleModel = this.filterCriteria['modelNo']
//                 ? outVehicle.vehicle.vehicleModel?.toLowerCase().includes(this.filterCriteria['modelNo']!.toLowerCase())
//                 : true;
  
//               return matchesVehicleType && matchesVehicleModel;



//             });
//           } 
          
//           else if (this.searchTerm) {
//              const lowerSearchTerm = this.searchTerm.toLowerCase();
//             this.filteredVehicles = vehicles.filter((outVehicle) => {
//               return (
//                 outVehicle.vehicle.vehicleRegistrationNumber?.toLowerCase().includes(lowerSearchTerm) ||
//                 outVehicle.vehicle.chassisNumber?.toLowerCase().includes(lowerSearchTerm) ||
//                 outVehicle.vehicle.vehicleType?.toLowerCase().includes(lowerSearchTerm)
//               );
//             });
//           }
//           else {
//              this.filteredVehicles = vehicles;
//           }
//         } else {
//           this.filteredVehicles = [];
//         }
  
//          this.dataSource.data = this.filteredVehicles;
//       });
//   }
  
  
  
//   // Handle filter dialog logic
//   openFilterDialog(): void {
//     const dialogRef = this.dialog.open(FilterdialogComponent, {
//       width: '500px',
//       data: {}
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result?.filters) {
//          this.filterCriteria = result.filters;
//         this.refreshVehicles(); 
//       }
//     });
//   }

//    private showErrorMessage(errorMessage: string): void {
//     this.snakbar.open(errorMessage, 'Close', {
//       duration: 3000,
//       horizontalPosition: 'right',
//       verticalPosition: 'top'
//     });
//   }

//    onEdit(outVehicle: OutVehicle): void {
//     const dialogRef = this.dialog.open(AddvehicleComponent, {
//       width: '600px',
//       height: '800px',
//       data: outVehicle.vehicle,
//     });

//     dialogRef.afterClosed().subscribe((updatedVehicle: Vehicle) => {
//       if (updatedVehicle) {
//         const updatedOutVehicle: OutVehicle = {
//           vehicle: updatedVehicle,
//           forwardingAgent: null,
//           verificationStatus: null,
//           trackingMode: "MANUAL",
//           broker: null,
//           uuid: null,
//           orgId: null,
//         };
//         this.store.dispatch(updateVehicle({ vehicle: updatedOutVehicle }));
//       }
//     });
//   }

//   onDelete(outVehicle: OutVehicle): void {
//     this.store.dispatch(deleteVehicle({ vehicleId: outVehicle.vehicle.uuid }));
//   }

//   onAddVehicle(vehicle: Vehicle): void {
//     const newOutVehicle: OutVehicle = {
//       vehicle,
//       forwardingAgent: null,
//       verificationStatus: null,
//       trackingMode: "MANUAL",
//       broker: null,
//       uuid: null,
//       orgId: null
//     };
//     this.store.dispatch(addVehicle({ vehicle: newOutVehicle }));
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['searchTerm']) {
//       this.refreshVehicles();   
//     }
//   }

//   ngOnDestroy(): void {
//     this.unsubscribe$.next();
//     this.unsubscribe$.complete();
//   }

//    applyFilter(criteria: any): void {
//     this.filterCriteria = criteria;
//     this.refreshVehicles();
//   }
// }






import { MatDialog } from '@angular/material/dialog';
import { Vehicle } from '../../Model/vehicle.model';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectAllVehicles, selectVehicleError } from '../../Reducer/vehicle.selector';
import { addVehicle, deleteVehicle, loadVehicles, updateVehicle } from '../../Actions/vehicle.action';
import { AddvehicleComponent } from '../addvehicle/addvehicle.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OutVehicle } from '../../Model/vehicle.model';
import { VehicleService } from '../../Services/vehicle.service';
import { FilterdialogComponent } from '../filterdialog/filterdialog.component';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit, OnDestroy {
  vehicles$: Observable<OutVehicle[]>; // Observable for the original vehicle list
  vehicleError$: Observable<string | null>;
  vehicles: OutVehicle[] = []; // Local array for filtered vehicles
  dataSource: { data: OutVehicle[] } = { data: [] }; // Bound to UI
  displayedColumns: string[] = ['vehicleRegistrationNumber', 'vehicleType', 'vehicleModel']; // Example columns
  private unsubscribe$ = new Subject<void>();
  @Input() searchTerm: string = '';
  filterCriteria: { [key: string]: string | undefined } = {};

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private snakbar: MatSnackBar,
    private vehicleService: VehicleService,
    private cdr: ChangeDetectorRef
  ) {
    this.vehicles$ = this.store.select(selectAllVehicles);
    this.vehicleError$ = this.store.select(selectVehicleError);
  }

  ngOnInit(): void {
    this.refreshVehicles(); // Initially load all vehicles

    this.vehicleError$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((errorMessage) => {
        if (errorMessage) {
          console.error('Error:', errorMessage);
          this.showErrorMessage(errorMessage);
        }
      });
  }

  refreshVehicles(): void {
    const transformedFilters = {
      filters: Object.keys(this.filterCriteria).reduce((acc, key) => {
        const value = this.filterCriteria[key];
        if (value) {
          acc[key] = [value];
        }
        return acc;
      }, {} as { [key: string]: string[] }),
    }
    this.store.dispatch(loadVehicles({filters: transformedFilters}))
     // this.store.dispatch(loadVehicles());

    this.vehicles$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((vehicles: OutVehicle[]) => {
        if (vehicles) {
          this.vehicles = this.applySearchAndFilter(vehicles);
        }
        else {
          this.vehicles = [];
        }

        this.dataSource.data = this.vehicles;
      });
  }

  private applySearchAndFilter(vehicles: OutVehicle[]): OutVehicle[] {
    return vehicles.filter((outVehicle) => {
      const matchesVehicleType = this.filterCriteria['vehicleType']
        ? outVehicle.vehicle.vehicleType?.toLowerCase().includes(this.filterCriteria['vehicleType']!.toLowerCase())
        : true;

      const matchesVehicleModel = this.filterCriteria['vehicleModel']
        ? outVehicle.vehicle.vehicleModel?.toLowerCase().includes(this.filterCriteria['vehicleModel']!.toLowerCase())
        : true;
 
      const matchesSearch = this.searchTerm
        ? outVehicle.vehicle.vehicleRegistrationNumber?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          outVehicle.vehicle.chassisNumber?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          outVehicle.vehicle.vehicleModel?.toLowerCase().includes(this.searchTerm.toLowerCase())
         : true;

      return matchesVehicleType && matchesVehicleModel && matchesSearch
    });
  }

  // openFilterDialog(): void {
  //   const dialogRef = this.dialog.open(FilterdialogComponent, {
  //     width: '500px',
  //     data: {},
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log(result);
  //     if (result?.filters) {
        
  //       this.filterCriteria = result.filters;
  //       this.refreshVehicles();
  //     }
  //   });
  // }


  private showErrorMessage(errorMessage: string): void {
    this.snakbar.open(errorMessage, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm']) {
      this.refreshVehicles();
    }
  }

  onEdit(vehicle: OutVehicle): void {
    const dialogRef = this.dialog.open(AddvehicleComponent, {
      width: '600px',
      height: '800px',
      data: vehicle.vehicle,  
    });
  
    dialogRef.afterClosed().subscribe((updatedVehicle: Vehicle) => {
      if (updatedVehicle) {
        const updatedOutVehicle: OutVehicle = {
          vehicle: updatedVehicle,
          forwardingAgent: null,
          verificationStatus: null,
          trackingMode: "MANUAL",
          broker: null,
          uuid: null,
          orgId: null,
        };
        this.store.dispatch(updateVehicle({ vehicle: updatedOutVehicle }));
      }
    });
  }
  
  onDelete(vehicle: OutVehicle): void {
    this.store.dispatch(deleteVehicle({ vehicleId: vehicle.vehicle.uuid }));
  }
  
  applyFilter(filterCriteria: any): void {
    this.filterCriteria = filterCriteria;
    this.refreshVehicles(); 
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}







// import { MatDialog } from '@angular/material/dialog';
// import { Vehicle } from '../../Model/vehicle.model';
// import { Store } from '@ngrx/store';
// import { Observable, Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { selectAllVehicles, selectFilteredVehicles, selectVehicleError } from '../../Reducer/vehicle.selector';
// import { addVehicle, deleteVehicle, loadVehicles, updateVehicle } from '../../Actions/vehicle.action';
// import { AddvehicleComponent } from '../addvehicle/addvehicle.component';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { OutVehicle } from '../../Model/vehicle.model';
// import { VehicleService } from '../../Services/vehicle.service';
// import { FilterdialogComponent } from '../filterdialog/filterdialog.component';
// import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

// @Component({
//   selector: 'app-vehicle',
//   templateUrl: './vehicle.component.html',
//   styleUrls: ['./vehicle.component.css'],
// })
// export class VehicleComponent implements OnInit, OnDestroy {
//   vehicles$: Observable<OutVehicle[]>; // Observable for the original vehicle list
//   vehicleError$: Observable<string | null>;
//   filteredVehicles: OutVehicle[] = []; // Local array for filtered vehicles
//   dataSource: { data: OutVehicle[] } = { data: [] }; // Bound to UI
//   displayedColumns: string[] = ['vehicleRegistrationNumber', 'vehicleType', 'vehicleModel']; // Example columns
//   private unsubscribe$ = new Subject<void>();
//   @Input() searchTerm: string = '';
//   filterCriteria: { [key: string]: string | undefined } = {};

//   constructor(
//     private store: Store,
//     private dialog: MatDialog,
//     private snakbar: MatSnackBar,
//     private vehicleService: VehicleService,
//     private cdr: ChangeDetectorRef
//   ) {
//     this.vehicles$ = this.store.select(selectAllVehicles);
//     this.vehicleError$ = this.store.select(selectVehicleError);
//   }

//   ngOnInit(): void {
//     this.store
//       .select(selectFilteredVehicles) // Use the correct selector
//       .pipe(takeUntil(this.unsubscribe$))
//       .subscribe((filteredVehicles) => {
//         this.filteredVehicles = filteredVehicles || [];
//         this.dataSource.data = this.filteredVehicles; // Update the data source for UI
//       });
  
//     // Handle vehicle errors
//     this.vehicleError$
//       .pipe(takeUntil(this.unsubscribe$))
//       .subscribe((errorMessage) => {
//         if (errorMessage) {
//           this.showErrorMessage(errorMessage);
//         }
//       });
  
//     // Dispatch initial load of vehicles
//     this.refreshVehicles();
//   }
  

//   refreshVehicles(): void {
//     const transformedFilters = {
//       filters: Object.keys(this.filterCriteria).reduce((acc, key) => {
//         const value = this.filterCriteria[key];
//         if (value) {
//           acc[key] = [value];
//         }
//         return acc;
//       }, {} as { [key: string]: string[] }),
//     };
//     this.store.dispatch(loadVehicles({ filters: transformedFilters }));
//   }

//   private showErrorMessage(errorMessage: string): void {
//     this.snakbar.open(errorMessage, 'Close', {
//       duration: 3000,
//       horizontalPosition: 'right',
//       verticalPosition: 'top',
//     });
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['searchTerm']) {
//       this.refreshVehicles();
//     }
//   }

//   onEdit(vehicle: OutVehicle): void {
//     const dialogRef = this.dialog.open(AddvehicleComponent, {
//       width: '600px',
//       height: '800px',
//       data: vehicle.vehicle, // Pass the vehicle data to the dialog
//     });

//     dialogRef.afterClosed().subscribe((updatedVehicle: Vehicle) => {
//       if (updatedVehicle) {
//         const updatedOutVehicle: OutVehicle = {
//           vehicle: updatedVehicle,
//           forwardingAgent: null,
//           verificationStatus: null,
//           trackingMode: "MANUAL",
//           broker: null,
//           uuid: null,
//           orgId: null,
//         };
//         this.store.dispatch(updateVehicle({ vehicle: updatedOutVehicle }));
//       }
//     });
//   }

//   onDelete(vehicle: OutVehicle): void {
//     this.store.dispatch(deleteVehicle({ vehicleId: vehicle.vehicle.uuid }));
//   }

//   applyFilter(filterCriteria: any): void {
//     this.filterCriteria = filterCriteria;
//     this.refreshVehicles();
//   }

//   ngOnDestroy(): void {
//     this.unsubscribe$.next();
//     this.unsubscribe$.complete();
//   }
// }
