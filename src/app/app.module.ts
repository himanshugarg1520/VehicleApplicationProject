import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleComponent } from './Vehicle/Components/vehicle/vehicle.component';
import { HeaderComponent } from './Vehicle/Components/header/header.component';
import { VehicleService } from './Vehicle/Services/vehicle.service';
import { AddvehicleComponent } from './Vehicle/Components/addvehicle/addvehicle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store'
 import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { vehicleReducer } from './Vehicle/Reducer/vehicle.reducer';
import { VehicleEffects } from './Vehicle/Effects/vehicle.effects';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule} from '@angular/material/input';
import { FilterdialogComponent } from './Vehicle/Components/filterdialog/filterdialog.component'
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field'  
import { MatCardModule
 } from '@angular/material/card'

@NgModule({
  declarations: [
    AppComponent,
    VehicleComponent,
    HeaderComponent,
    AddvehicleComponent,
    FilterdialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    // StoreModule.forRoot({}, {}),
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([VehicleEffects]), 
    StoreModule.forFeature('vehicle', vehicleReducer),
    HttpClientModule,
    CommonModule,
    StoreModule.forRoot({}, {}),
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule
    ],
  providers: [VehicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
