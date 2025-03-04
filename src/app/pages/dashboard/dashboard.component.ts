import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MasterService } from '../../service/master.service';
import { IAPIResponseModel, Ibooking, IProperty } from '../../models/master';
import { map, Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  masterSrv = inject(MasterService);
  bookingID: number = 0;
  siteId: number = 0;
  bookingList: Ibooking[] = [];
  propertyList: IProperty[] = [];
  currentPropertyId: number = 0;
  booking$: Observable<Ibooking[]> = new Observable<Ibooking[]>();

  constructor() {}

  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.booking$ = this.masterSrv.getAllPropertyBooking().pipe(
      map((res: IAPIResponseModel) => {
        console.log("API Response - Booking List:", res);
        if (res.result) {
          return res.data;
        } else {
          return [];
        }
      })
    );
  }

  getProperties() {
    console.log("Selected Booking ID:", this.bookingID);
  
    this.masterSrv.getBookingByBookingId(this.bookingID).subscribe(
      (res: IAPIResponseModel) => {
        console.log("API Response - Booking Details:", res);
        if (res.result && res.data) {
          // Store booking details (includes customer info)
          this.bookingList = [res.data]; // Convert single object to array for *ngFor
        } else {
          this.bookingList = [];
        }
      },
      (error) => {
        console.error("API Error - Booking Details:", error);
      }
    );
  }
}
