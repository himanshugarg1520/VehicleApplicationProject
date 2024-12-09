

import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleService } from '../../Services/vehicle.service';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { OutVehicle, Vehicle } from '../../Model/vehicle.model';
import { Store } from '@ngrx/store';
import { applyFilter } from '../../Actions/vehicle.action';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filterdialog.component.html',
  styleUrls: ['./filterdialog.component.css']
})
export class FilterdialogComponent implements OnInit, OnDestroy {

  vehicleTypes: string[] = [];
  modelNos: string[] = [];
  filteredModelNos: string[] = [];
  filteredTypes: string[] = [];
  selectedFilters = {
    vehicleType: '',
    vehicleModel: ''
  };
  selectedType: string = '';
  selectedModel: string = '';


  isLoading = false;
  hasError = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private vehicleService: VehicleService,
    public dialogRef: MatDialogRef<FilterdialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
     this.loadVehicleTypes();
     this.loadVehicleModels();
  }

  private loadVehicleTypes(): void {
    this.isLoading = true;
    this.vehicleService.getVehicleTypes().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (response) => {
        this.vehicleTypes = response || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading =  false;
        this.hasError = true;
       }
    });
  }

  private loadVehicleModels(): void {
    this.isLoading = true;
    this.vehicleService.getVehicleModels().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (response) => {
        this.modelNos = response || [];
        // this.filteredModelNos = [...this.modelNos];
        this.isLoading = false;
        console.log("Load Response Pass: ", response);
       },
      error: () => {
        this.isLoading = false;
        this.hasError = true;
      }
    });
  }
  
  onVehicleTypeChange(): void {
    if (this.selectedFilters.vehicleType) {
       this.loadVehicleTypes();
    } else {
       this.filteredModelNos = [];
    }
  }

  onVehicleModelChange():void{
    if(this.selectedFilters.vehicleModel){
      this.loadVehicleModels();
    }
    else{
      this.filteredTypes = []
    }
  }



  // applyFilters(): void {
  //   const filters = {
  //     filters: {
  //       vehicleType: Array.isArray(this.selectedFilters.vehicleType) ? this.selectedFilters.vehicleType : [],
  //       vehicleModel: Array.isArray(this.selectedFilters.vehicleModel) ? this.selectedFilters.vehicleModel : [],
  //     },
  //   };
  
  //   console.log("Filters Payload:", filters);
  
  //   this.vehicleService.getFilterVehicles(filters).subscribe({
    
  //     next: (response) => {
  //       console.log("Response:", response);
  
  //       const allVehicles: Vehicle[] = response || [];
  //        let filteredVehicles = allVehicles
  
  //       console.log("Vehicles returned by API: ", allVehicles);
  
  //       console.log("Filtered Vehicles: ", filteredVehicles)
  //       this.dialogRef.close({filters, filteredVehicles});
  //     },
  //     error: (error) => {
  //       this.hasError = true;
  //       console.error("Error fetching vehicles:", error);
  //       this.dialogRef.close({ filters, filteredVehicles: [] });
  //     },
  //   });
  // }   


  // applyFilter() {
  //   this.store.dispatch(applyFilter({
  //     vehicleType: this.selectedType,
  //     vehicleModel: this.selectedModel,
  //   }));
  // }

  applyFilter(): void {
   this.store.dispatch(applyFilter({
      vehicleType: this.selectedFilters.vehicleType,
      vehicleModel: this.selectedFilters.vehicleModel,
    }));
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}






