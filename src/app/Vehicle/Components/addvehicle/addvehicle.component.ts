

// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Vehicle } from '../../Model/vehicle.model';
// import { Store } from '@ngrx/store';
// import { addVehicle } from '../../Actions/vehicle.action';

// @Component({
//   selector: 'app-addvehicle',
//   templateUrl: './addvehicle.component.html',
//   styleUrls: ['./addvehicle.component.css']
// })
// export class AddvehicleComponent {
//   vehicleForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private dialogRef: MatDialogRef<AddvehicleComponent>,
//     private store: Store,
//     @Inject(MAT_DIALOG_DATA) public data: Vehicle | null // Handle edit or add mode
//   ) {
//     this.vehicleForm = this.fb.group({
//       vehicleNo: [data?.vehicleNo || '', Validators.required],
//       type: [data?.type || '', Validators.required],
//       modelNo: [data?.modelNo || '', Validators.required]
//     });
//   }

//   onSave(): void {
//     if (this.vehicleForm.valid) {
//       const vehicle: Vehicle = this.vehicleForm.value;

//       if (this.data) {
//         // Edit mode: include the ID for the update
//         vehicle.id = this.data.id;
//       }

//       // Dispatch add or update vehicle action
//       if (this.data) {
//         // Update existing vehicle
//         this.store.dispatch({
//           type: '[Vehicle] Update Vehicle',
//           vehicle,
//         });
//       } else {
//         // Add new vehicle
//         this.store.dispatch(addVehicle({ vehicle }));
//       }

//       // Close dialog and pass back the result
//       this.dialogRef.close(vehicle);
//     }
//   }

//   onCancel(): void {
//     this.dialogRef.close(null); // Close without saving
//   }
// }



// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// import { Vehicle } from '../../Model/vehicle.model';
// import { Store } from '@ngrx/store';
// import { addVehicle, updateVehicle } from '../../Actions/vehicle.action';
// import { VehicleService } from '../../Services/vehicle.service';
// import { MatButtonModule } from '@angular/material/button';


// @Component({
//   selector: 'app-addvehicle',
//   templateUrl: './addvehicle.component.html',
//   styleUrls: ['./addvehicle.component.css']
// })
// export class AddvehicleComponent {
//   vehicleForm: FormGroup;
//   manufacturers: string[] = [];

//   constructor(
//     private fb: FormBuilder,
//     private dialogRef: MatDialogRef<AddvehicleComponent>,
//     private store: Store,
//     private vehicleservice: VehicleService,
//     @Inject(MAT_DIALOG_DATA) public data: Vehicle | null 
//   ) {
//     this.vehicleservice.getManufacturerData().subscribe((data) => {
//       this.manufacturers = data;
//     }),
//     this.vehicleForm = this.fb.group({
//       // id: [data?.id || '', Validators.required],
//       vehicleRegistrationNumber: [data?.vehicleRegistrationNumber || '', Validators.required],
//       chassisNumber: [data?.chassisNumber || '', Validators.required],
//       groups: this.fb.array(
//         data?.groups?.map(g => this.fb.control(g)) || [],
//         // Validators.required
//       ),
//       // manufacturer: [data?.manufacturer || '', Validators.required],
//       manufacturerName: [data?.manufacturerName],
//       vehicleModel: [data?.vehicleModel],
//       // engineNo: [data?.engineNo || '', Validators.required],
//       engineNo: [data?.engineNo],
//       vehicleType: [data?.vehicleType],
//       description: [data?.description]
//     });
//   }

//    get group(): FormArray {
//     return this.vehicleForm.get('groups') as FormArray;
//   }

//   onSave(): void {
//     // debugger
//     if (this.vehicleForm.valid) {
//       const vehicle: Vehicle = this.vehicleForm.value;

//       if (this.data) {
//          vehicle.uuid = this.data.uuid;
//       }
//       if (this.data) {
//         this.store.dispatch(updateVehicle({ vehicle }));
//       }
//       else {
//         this.store.dispatch(addVehicle({ vehicle }));
//       }
//       this.dialogRef.close( vehicle );
//     }
//   }


//   onCancel(): void {
//     this.dialogRef.close(null); 
//   }

//   addGroup(): void {
//     this.group.push(this.fb.control('', Validators.required)); 
//   }
  
//   removeGroup(index: number): void {
//     this.group.removeAt(index);
//   }
  
// }



import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Vehicle } from '../../Model/vehicle.model';
import { Store } from '@ngrx/store';
import { addVehicle, updateVehicle } from '../../Actions/vehicle.action';
import { VehicleService } from '../../Services/vehicle.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.css']
})
export class AddvehicleComponent {
  vehicleForm: FormGroup;
  manufacturers: string[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddvehicleComponent>,
    private store: Store,
    private vehicleService: VehicleService,
    @Inject(MAT_DIALOG_DATA) public data: Vehicle | null
  ) {
    this.fetchManufacturers();

     this.vehicleForm = this.fb.group({
      vehicleRegistrationNumber: [data?.vehicleRegistrationNumber || '', Validators.required],
      chassisNumber: [data?.chassisNumber || '', Validators.required],
      // groups: this.fb.array(
      //   data?.groups?.map(g => this.fb.control(g, Validators.required)) || [],
      //  ),
     
      groups: this.fb.array(data?.groups || []),

      manufacturerName: [data?.manufacturerName],
      vehicleModel: [data?.vehicleModel || '', Validators.required],
      engineNo: [data?.engineNo],
      vehicleType: [data?.vehicleType],
      description: [data?.description]
    });
  }

   get group(): FormArray {
    return this.vehicleForm.get('groups') as FormArray;
  }
  
  

   private fetchManufacturers(): void {
    this.vehicleService.getManufacturerData().subscribe({
      next: (data) => {
        this.manufacturers = data;
      },
      error: (err) => {
        console.error('Error fetching manufacturers:', err);
        this.manufacturers = [];
      }
    });
  }

  onSave(): void {
    if (this.vehicleForm.valid) {
      const vehicle: Vehicle = this.vehicleForm.value;

      if (this.data) {
         this.store.dispatch(
          updateVehicle({
            vehicle: {
              vehicle: { ...this.data, ...vehicle },
              forwardingAgent: null,
              verificationStatus:  null,
              trackingMode: '',
              broker: null,
              uuid: this.data.uuid, 
              orgId: null
             }
          })
        );
      } 
      
      else {
 
        // this.store.dispatch(
        //   addVehicle({
        //     vehicle: {
        //       vehicle,
        //       forwardingAgent: null,
        //       verificationStatus: null,
        //       trackingMode: '',
        //       broker: null,
        //       uuid: null,
        //       orgId: null,
        //      }
        //   })

        // );

        this.store.dispatch(
          addVehicle({
            vehicle: {
              vehicle: {
                // uuid: uuidv4(),  
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
              trackingMode: '',
              broker: null,
              uuid: null,
              orgId: null
             }
          })
        );        
        
      }

      this.dialogRef.close(vehicle);
    }
  }

   onCancel(): void {
    this.dialogRef.close(null);
  }

   addGroup(): void {
    this.group.push(this.fb.control('', Validators.required));
  }
  
  removeGroup(index: number): void {
    if (index >= 0 && index < this.group.length) {
      this.group.removeAt(index);
    }
  }

  

}
