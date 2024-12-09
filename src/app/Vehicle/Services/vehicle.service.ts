


// import { Injectable } from '@angular/core';
// import { catchError, Observable, of, map, tap, forkJoin, combineLatest } from 'rxjs';
// import { Manufacturer, OutVehicle, Vehicle } from '../Model/vehicle.model';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Store } from '@ngrx/store';
// import { addVehicle, loadVehicles, updateVehicle, deleteVehicle } from '../Actions/vehicle.action';
// import { FilterdialogComponent } from '../Components/filterdialog/filterdialog.component';
 
// @Injectable({
//   providedIn: 'root'
// })
// export class VehicleService {

//   private getVehiclesUrl = 'https://apis.fretron.com/shipment-view/partner-fleet/fleets/v2';

//   private addVehicleUrl = 'https://apis.fretron.com/partner-fleet/v2/fleet/v2';
//   private manufacturerUrl = 'https://apis.fretron.com/vehicles/v2/manufacture/manufactures';

//   private vehicleTypesUrl = 'https://apis.fretron.com/shipment-view/partner-fleet/suggest/vehicleType?search=';
//   private vehicleModelsUrl = 'https://apis.fretron.com/shipment-view/partner-fleet/suggest/vehicleModel?search=';

//   private authToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3Mjk3NTM1MzYsInVzZXJJZCI6IjBmZDZhN2FjLTVhMmEtNDJlYy04ZmIyLWJmMzY4Y2YzODJjNyIsImVtYWlsIjoiZGl2eWFuc2hpLmd1cHRhQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiNzgzMTA2MjA5MSIsIm9yZ0lkIjoiNDk1Yjg3MjgtYzc2MS00ZmE3LTgzZmUtZGI3NWE3ZDYzMjIxIiwibmFtZSI6IkRpdnlhbnNoaSBHdXB0YSIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.MMvAQ7zkolkQ1zkjiRgxGwp9y-y9fhwPh9yA5dGig4c';

//   constructor(private http: HttpClient, private snakbar: MatSnackBar, private store: Store) { }

//   // Helper function to create headers with authorization token
//   private createHeaders(): HttpHeaders {
//     return new HttpHeaders().set('Authorization', this.authToken);
//   }

//   getVehicles(): Observable<Vehicle[]> {
//     return this.http.get<any>(this.getVehiclesUrl, { headers: this.createHeaders() }).pipe(
//       map((response: any) => {
//         const vehicleData = response?.data ?? [];
//         return vehicleData.map((vehicle: any) => ({
//           uuid: vehicle?.vehicle?.uuid ?? '',
//           vehicleRegistrationNumber: vehicle?.vehicle?.vehicleRegistrationNumber ?? '',
//           chassisNumber: vehicle?.vehicle?.chassisNumber ?? '',
//           groups: vehicle?.vehicle?.groups ?? [],
//           vehicleModel: vehicle?.vehicle?.vehicleModel ?? '',
//           vehicleType: vehicle?.vehicle?.vehicleType ?? '',
//           description: vehicle?.vehicle?.description ?? '',
//         }));
//       }),
//       catchError((error) => {
//         console.error('Error fetching vehicles:', error);
//         this.snakbar.open('Error fetching vehicles. Please try again later.', 'Close', {
//           duration: 5000,
//           horizontalPosition: 'right',
//           verticalPosition: 'top'
//         });
//         return of([]); 
//       })
//     );
//   }

//   addVehicle(vehicle: Vehicle): Observable<OutVehicle> {
//     return this.http.post<OutVehicle>(this.addVehicleUrl, vehicle, { headers: this.createHeaders() }).pipe(
//       map((response) => {
//         const outVehicle: OutVehicle = {
//           ...response,
//           vehicle: response.vehicle ?? {}, 
//           forwardingAgent: response.forwardingAgent ?? null,
//           verificationStatus: response.verificationStatus ?? 'Pending',  
//           trackingMode: response.trackingMode ?? 'Manual', 
//         };

//         this.store.dispatch(addVehicle({ vehicle: outVehicle }));
//         return outVehicle;
//       }),
//       catchError((error) => {
//         console.error('Error adding vehicle:', error);
//         this.snakbar.open('Error adding vehicle. Please try again later.', 'Close', {
//           duration: 5000,
//           horizontalPosition: 'right',
//           verticalPosition: 'top'
//         });
//         return of({} as OutVehicle);
//       })
//     );
//   }

//   updateVehicle(vehicleId: string, updatedVehicle: Vehicle): Observable<Vehicle> {
//     const updateVehicleUrl = `${this.addVehicleUrl}/${vehicleId}`;
//     return this.http.put<Vehicle>(updateVehicleUrl, updatedVehicle, { headers: this.createHeaders() }).pipe(
//       map((response) => {
//         const updated: OutVehicle = {
//           vehicle: response,
//           forwardingAgent: null,  
//           verificationStatus: null, 
//           trackingMode: '',  
//           broker: null, 
//           uuid: response.uuid, 
//           orgId: null,
//         };

//         this.store.dispatch(updateVehicle({ vehicle: updated }));
//         this.snakbar.open('Vehicle updated successfully.', 'Close', {
//           duration: 3000,
//           horizontalPosition: 'right',
//           verticalPosition: 'top'
//         });
//         return response;
//       }),
//       catchError((error) => {
//         console.error('Error updating vehicle:', error);
//         this.snakbar.open('Error updating vehicle. Please try again later.', 'Close', {
//           duration: 5000,
//           horizontalPosition: 'right',
//           verticalPosition: 'top'
//         });
//         return of({} as Vehicle); 
//       })
//     );
//   }

//   deleteVehicle(vehicleId: string): Observable<any> {
//     const deleteVehicleUrl = `${this.addVehicleUrl}/${vehicleId}`;
//     return this.http.delete<any>(deleteVehicleUrl, { headers: this.createHeaders() }).pipe(
//       map((response) => {
//         this.store.dispatch(deleteVehicle({ vehicleId }));
//         this.snakbar.open('Vehicle deleted successfully.', 'Close', {
//           duration: 3000,
//           horizontalPosition: 'right',
//           verticalPosition: 'top'
//         });
//         return response;
//       }),
//       catchError((error) => {
//         console.error('Error deleting vehicle:', error);
//         this.snakbar.open('Error deleting vehicle. Please try again later.', 'Close', {
//           duration: 5000,
//           horizontalPosition: 'right',
//           verticalPosition: 'top'
//         });
//         return of({ success: false });
//       })
//     );
//   }

//   getManufacturerData(): Observable<string[]> {
//     return this.http.get<any>(this.manufacturerUrl, { headers: this.createHeaders() }).pipe(
//       map((response: any) => {
//         const modelList = response?.modelist ?? [];
//         return modelList.map((model: any) => model.name);
//       }),
//       catchError((error) => {
//         console.error('Error fetching manufacturer data:', error);
//         this.snakbar.open('Error fetching manufacturer data. Please try again later.', 'Close', {
//           duration: 5000,
//           horizontalPosition: 'right',
//           verticalPosition: 'top'
//         });
//         return of([]); 
//       })
//     );
//   }



// //   console.log("Final Params: ", params.toString());

// //   return this.http.get<any>(this.getVehiclesUrl, { headers: this.createHeaders(), params }).pipe(
// //     map((response) => response?.data || []),
// //     catchError((error) => this.handleError('Error fetching vehicles', error))
// //   );
// // }





// // getFilterVehicles(
// //   filters?: { filters: { [key: string]: string[] } },
// //   selectedRowCriteria?: { [key: string]: string | number }
// // ): Observable<any> {
// //   let params = new HttpParams();

// //   if (filters?.filters) {
// //      params = params.set('filters', JSON.stringify(filters.filters));
// //   }

// //   return this.http.get<any>(this.getVehiclesUrl, { headers: this.createHeaders(), params }).pipe(
// //     map((response) => {
// //       const allRows = response?.data || [];

// //       if (selectedRowCriteria) {
// //         return allRows.filter((row: any) =>
// //           Object.keys(selectedRowCriteria).every(
// //             (key) => row[key] === selectedRowCriteria[key]
// //           )
// //         );
// //       }
// //       return allRows;
// //     }),       
// //     catchError((error) =>
// //       this.handleError('Error fetching filtered vehicles', error)
// //     )
// //   );
// // }



// getFilterVehicles(
//   filters?: { filters: { [key: string]: string[] } },
//   selectedRowCriteria?: { [key: string]: string | number }
// ): Observable<Vehicle[]> {
//   let params = new HttpParams();

//   if (filters?.filters) {
//     params = params.set('filters', JSON.stringify(filters.filters));
//   }

//   return this.http.get<any>(this.getVehiclesUrl, { headers: this.createHeaders(), params }).pipe(
//     map((response) => {
//       const allRows = response?.data || [];

//       if (selectedRowCriteria) {
//         return allRows.filter((row: any) =>
//           Object.keys(selectedRowCriteria).every(
//             (key) => row[key] === selectedRowCriteria[key]
//           )
//         );
//       }
//       return allRows;
//     }),
//     catchError((error) =>
//       this.handleError('Error fetching filtered vehicles', error)
//     )
//   );
// }




//  getVehicleTypes(): Observable<string[]> {
//   return this.http.get<string[]>(this.vehicleTypesUrl, { headers: this.createHeaders() }).pipe(
//     catchError((error) => this.handleError('Error fetching vehicle types', error))
//   );
// }

//  getVehicleModels(): Observable<string[]> {
//   return this.http.get<string[]>(this.vehicleModelsUrl, { headers: this.createHeaders() }).pipe(
//       catchError((error) => this.handleError('Error fetching vehicle models', error))
//   );
// }


//   private handleError(message: string, error: any): Observable<any> {
//     console.error(message, error);
//     this.snakbar.open(message, 'Close', {
//       duration: 5000,
//       horizontalPosition: 'right',
//       verticalPosition: 'top',
//     });
//     return of([]);
//   }

// }








import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, filter } from 'rxjs';
import { Manufacturer, OutVehicle, Vehicle } from '../Model/vehicle.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addVehicle, loadVehicles, updateVehicle, deleteVehicle } from '../Actions/vehicle.action';
import { keyframes } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private getVehiclesUrl = 'https://apis.fretron.com/shipment-view/partner-fleet/fleets/v2';
  private addVehicleUrl = 'https://apis.fretron.com/partner-fleet/v2/fleet/v2';
  private manufacturerUrl = 'https://apis.fretron.com/vehicles/v2/manufacture/manufactures';
  private vehicleTypesUrl = 'https://apis.fretron.com/shipment-view/partner-fleet/suggest/vehicleType?search=';
  private vehicleModelsUrl = 'https://apis.fretron.com/shipment-view/partner-fleet/suggest/vehicleModel?search=';
  private authToken = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3Mjk3NTM1MzYsInVzZXJJZCI6IjBmZDZhN2FjLTVhMmEtNDJlYy04ZmIyLWJmMzY4Y2YzODJjNyIsImVtYWlsIjoiZGl2eWFuc2hpLmd1cHRhQGZyZXRyb24uY29tIiwibW9iaWxlTnVtYmVyIjoiNzgzMTA2MjA5MSIsIm9yZ0lkIjoiNDk1Yjg3MjgtYzc2MS00ZmE3LTgzZmUtZGI3NWE3ZDYzMjIxIiwibmFtZSI6IkRpdnlhbnNoaSBHdXB0YSIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjp0cnVlLCJwb3J0YWxUeXBlIjoiYmFzaWMifQ.MMvAQ7zkolkQ1zkjiRgxGwp9y-y9fhwPh9yA5dGig4c';

  constructor(private http: HttpClient, private snakbar: MatSnackBar, private store: Store) { }

   private createHeaders(): HttpHeaders {
    return new HttpHeaders().set('Authorization', this.authToken);
  }
  /**
    *@param filters 
   * @param selectedRowCriteria
   */
    getVehicles(filters?: { [key: string]: string[] }, selectedRowCriteria?: { [key: string]: string | number }): Observable<Vehicle[]> {
      let params = new HttpParams();
    
      if (filters) {
        params = params.set('filters', JSON.stringify(filters)); 
      }
    
      return this.http.get<any>(this.getVehiclesUrl, { headers: this.createHeaders(), params }).pipe(
        map((response) => {
          const allRows = response?.data || [];
          const filteredRows = selectedRowCriteria
            ? allRows.filter((row: any) =>
                Object.keys(selectedRowCriteria).every(
                  (key) => row[key] === selectedRowCriteria[key]
                )
              )
            : allRows;
    
          return filteredRows.map((vehicle: any) => ({
            uuid: vehicle?.vehicle?.uuid ?? '',
            vehicleRegistrationNumber: vehicle?.vehicle?.vehicleRegistrationNumber ?? '',
            chassisNumber: vehicle?.vehicle?.chassisNumber ?? '',
            groups: vehicle?.vehicle?.groups ?? [],
            vehicleModel: vehicle?.vehicle?.vehicleModel ?? '',
            vehicleType: vehicle?.vehicle?.vehicleType ?? '',
            description: vehicle?.vehicle?.description ?? '',
            manufacturerName: vehicle?.vehicle?.manufacturerName ?? '',
            engineNo: vehicle?.vehicle?.engineNo ?? '',
          }));
        }),
        catchError((error) => {
          console.error('Error fetching vehicles:', error);
          this.snakbar.open('Error fetching vehicles. Please try again later.', 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          return of([]);
        })
      );
    }
    
    
    


  addVehicle(vehicle: Vehicle): Observable<OutVehicle> {
    return this.http.post<OutVehicle>(this.addVehicleUrl, vehicle, { headers: this.createHeaders() }).pipe(
      map((response) => {
        const outVehicle: OutVehicle = {
          ...response,
          vehicle: response.vehicle ?? {},
          forwardingAgent: response.forwardingAgent ?? null,
          verificationStatus: response.verificationStatus ?? 'Pending',
          trackingMode: response.trackingMode ?? 'Manual',
        };

        this.store.dispatch(addVehicle({ vehicle: outVehicle }));
        return outVehicle;
      }),
      catchError((error) => this.handleError('Error adding vehicle', error))
    );
  }

  updateVehicle(vehicleId: string, updatedVehicle: Vehicle): Observable<Vehicle> {
    const updateVehicleUrl = `${this.addVehicleUrl}/${vehicleId}`;
    return this.http.put<Vehicle>(updateVehicleUrl, updatedVehicle, { headers: this.createHeaders() }).pipe(
      map((response) => {
        const updated: OutVehicle = {
          vehicle: response,
          forwardingAgent: null,
          verificationStatus: null,
          trackingMode: '',
          broker: null,
          uuid: response.uuid,
          orgId: null,
        };

        this.store.dispatch(updateVehicle({ vehicle: updated }));
        this.snakbar.open('Vehicle updated successfully.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        return response;
      }),
      catchError((error) => this.handleError('Error updating vehicle', error))
    );
  }

  deleteVehicle(vehicleId: string): Observable<any> {
    const deleteVehicleUrl = `${this.addVehicleUrl}/${vehicleId}`;
    return this.http.delete<any>(deleteVehicleUrl, { headers: this.createHeaders() }).pipe(
      map(() => {
        this.store.dispatch(deleteVehicle({ vehicleId }));
        this.snakbar.open('Vehicle deleted successfully.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }),
      catchError((error) => this.handleError('Error deleting vehicle', error))
    );
  }

  getManufacturerData(): Observable<string[]> {
    return this.http.get<any>(this.manufacturerUrl, { headers: this.createHeaders() }).pipe(
      map((response) => response?.modelist ?? []),
      catchError((error) => this.handleError('Error fetching manufacturer data', error))
    );
  }

  



  // getFilterVehicles(filters?: { filters: { [key: string]: string[] } }, selectedRowCriteria?: { [key: string]: string | number }): Observable<Vehicle[]> {
  //   let params = new HttpParams();
  
  //   if (filters?.filters) {
  //      params = params.set('filters', JSON.stringify(filters.filters));
  //   }
  
  //   return this.http.get<any>(this.getVehiclesUrl, { headers: this.createHeaders(), params }).pipe(
  //     map((response) => {
  //       const allRows = response?.data || [];
  //       const filteredRows = selectedRowCriteria
  //         ? allRows.filter((row: any) =>
  //             Object.keys(selectedRowCriteria).every(
  //               (key) => row[key] === selectedRowCriteria[key]
  //             )
  //           )
  //         : allRows;
  
  //       console.log('Filtered Rows:', filteredRows);
  //       return filteredRows.map((vehicle: any) => ({
  //         uuid: vehicle?.vehicle?.uuid ?? '',
  //         vehicleRegistrationNumber: vehicle?.vehicle?.vehicleRegistrationNumber ?? '',
  //         chassisNumber: vehicle?.vehicle?.chassisNumber ?? '',
  //         groups: vehicle?.vehicle?.groups ?? [],
  //         vehicleModel: vehicle?.vehicle?.vehicleModel ?? '',
  //         vehicleType: vehicle?.vehicle?.vehicleType ?? '',
  //         description: vehicle?.vehicle?.description ?? '',
  //         manufacturerName: vehicle?.vehicle?.manufacturerName ?? '',
  //         engineNo: vehicle?.vehicle?.engineNo ?? ''
  //       }));
  //     }),
  //     catchError((error) => this.handleError('Error fetching filtered vehicles', error))
  //   );
  // }


  getFilterVehicles(filters?: { filters: { [key: string]: string[] } }, selectedRowCriteria?: { [key: string]: string | number }): Observable<Vehicle[]> {
    let params = new HttpParams();
  
    if (filters?.filters) {
      params = params.set('filters', JSON.stringify(filters.filters));
    }
  
    return this.http.get<any>(this.getVehiclesUrl, { headers: this.createHeaders(), params }).pipe(
      map((response) => {
        const allRows = response?.data || [];
        const filteredRows = allRows.filter((row: any) => {
          return selectedRowCriteria
            ? Object.entries(selectedRowCriteria).every(([key, value]) => row[key] === value)
            : true;
        });
  
        return filteredRows.map((vehicle: any) => ({
          uuid: vehicle?.vehicle?.uuid ?? '',
          vehicleRegistrationNumber: vehicle?.vehicle?.vehicleRegistrationNumber ?? '',
          chassisNumber: vehicle?.vehicle?.chassisNumber ?? '',
          groups: vehicle?.vehicle?.groups ?? [],
          vehicleModel: vehicle?.vehicle?.vehicleModel ?? '',
          vehicleType: vehicle?.vehicle?.vehicleType ?? '',
          description: vehicle?.vehicle?.description ?? '',
          manufacturerName: vehicle?.vehicle?.manufacturerName ?? '',
          engineNo: vehicle?.vehicle?.engineNo ?? ''
        }));
      }),
      catchError((error) => this.handleError('Error fetching filtered vehicles', error))
    );
  }
  
    

  getVehicleTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.vehicleTypesUrl, { headers: this.createHeaders() }).pipe(
      catchError((error) => this.handleError('Error fetching vehicle types', error))
    );
  }

  getVehicleModels(): Observable<string[]> {
    return this.http.get<string[]>(this.vehicleModelsUrl, { headers: this.createHeaders() }).pipe(
      catchError((error) => this.handleError('Error fetching vehicle models', error))
    );
  }

  private handleError(message: string, error: any): Observable<any> {
    console.error(message, error);
    this.snakbar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
    return of([]);
  }
}
