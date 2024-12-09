


// import { Component, EventEmitter, Output } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { FilterdialogComponent } from '../filterdialog/filterdialog.component';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {

//   @Output() addVehicle = new EventEmitter<void>();
//   @Output() searchVehicle = new EventEmitter<string>();

//   searchControl = new FormControl('');
//   filterVisible = false;
//   filteredVehicles:any[]=[]

//   constructor(private dialog: MatDialog) {
//     this.searchControl.valueChanges.subscribe((searchText) => {
//       const safeSearchText = searchText ?? ''; 
//       this.searchVehicle.emit(safeSearchText);
//     });
//   }

//   onAddVehicle(): void {
//     this.addVehicle.emit(); 
//   }

//   openFilterDialog(): void {
//     const dialogRef = this.dialog.open(FilterdialogComponent, {
//       width: '400px',
//       data: { filterVisible: this.filterVisible },
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result?.filteredVehicles) {
//         this.filteredVehicles = result.filteredVehicles; 
//         this.filterVisible = true;   
//       } else {
//         this.filterVisible =  false;
//       }
//     });
//   }

//   @Output() filterVehicles = new EventEmitter<any>();
//   selectedType: string = '';  
//   selectedModel: string = ''; 

// onApplyFilter() {
//   const filterCriteria = {
//     type: this.selectedType,
//     model: this.selectedModel,
//   };
//   this.filterVehicles.emit(filterCriteria);
// }


//  }






import { Component, EventEmitter, Output, Input } from '@angular/core';  // Add Input import
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FilterdialogComponent } from '../filterdialog/filterdialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() addVehicle = new EventEmitter<void>();
  @Output() searchVehicle = new EventEmitter<string>();
  @Output() filterVehicles = new EventEmitter<any>();  // Ensure filterVehicles is an Output event

  @Input() searchTerm: string = '';  // Receive searchTerm from AppComponent

  searchControl = new FormControl('');
  filterVisible = false;
  filteredVehicles: any[] = [];
  
  selectedType: string = '';  
  selectedModel: string = ''; 

  constructor(private dialog: MatDialog) {
    this.searchControl.valueChanges.subscribe((searchText) => {
      const safeSearchText = searchText ?? ''; 
      this.searchVehicle.emit(safeSearchText);
    });
  }

  onAddVehicle(): void {
    this.addVehicle.emit(); 
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterdialogComponent, {
      width: '400px',
      data: { filterVisible:  this.filterVisible },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      
      if (result?.filteredVehicles) {
        this.filteredVehicles = result.filteredVehicles; 
        this.filterVehicles.emit(result.filteredVehicles);  // Emit filtered results
        this.filterVisible=true;
      }
      else {
        this.filterVisible = false;
      }
    })
  };

  onApplyFilter() {
    const filterCriteria = {
      type: this.selectedType || '',
      model: this.selectedModel || '',
    };
    this.filterVehicles.emit(filterCriteria);  // Emit the selected filter criteria
  }
}
