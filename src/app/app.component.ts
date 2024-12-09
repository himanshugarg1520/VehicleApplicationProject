import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddvehicleComponent } from './Vehicle/Components/addvehicle/addvehicle.component';
import { VehicleComponent } from './Vehicle/Components/vehicle/vehicle.component';
import { MatOptionModule } from '@angular/material/core';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title="Angular"
  
  searchTerm: string = ''; 

  @ViewChild('vehicleComponent') vehicleComponent!: VehicleComponent; 
  

  constructor(private dialog: MatDialog) {}

  // onAddVehicle(): void {
  //   this.dialog.open(AddvehicleComponent, {
  //     width: '500px',
  //     height: '800px',
  //   }).afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.vehicleComponent.refreshVehicles();
  //     }
  //   });
  // }


  onAddVehicle(): void {
    let width = '500px'; 
    let height = '800px'; 
  
    if (window.innerWidth <= 768) {
      width = '80%'; 
      height = '70vh'; 
    }
  
    this.dialog.open(AddvehicleComponent, {
      width: width,
      height: height,
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.vehicleComponent.refreshVehicles();
      }
    });
  }
  // Under Filter Funcitonality create 

  onSearchVehicle(searchTerm: string): void {
    this.searchTerm=searchTerm
  }

  onFilterVehicles(filterCriteria: any): void {
    this.vehicleComponent.applyFilter(filterCriteria);
  }

}