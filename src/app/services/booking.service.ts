import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Booking, DataObject } from '../models/cinema.model';
import { GenericHttpService } from './generic-http.service';

export interface IBookingService {
  addBooking(booking: Booking): Observable<Booking>;
  getBookingUpdates(): Observable<Booking[]>;
  getBookingSnapshot(): Booking[];
}

@Injectable({
  providedIn: 'root',
})
export class BookingService implements IBookingService {
  private httpService = inject(GenericHttpService);
  private bookings = new BehaviorSubject<Booking[]>([]);

  constructor() {
    this.loadBookings();
  }

  private loadBookings() {
    this.httpService.fetchData<DataObject<Booking>>('/bookings').subscribe({
      next: (data: DataObject<Booking>) => {
        console.log(data);
        this.bookings.next(data.content);
      },
      error: (error) => {
        // Error handling goes here
      },
    });
  }

  addBooking(booking: Booking) {
    return this.httpService.createData('/bookings', booking).pipe(
      map((data) => {
        this.loadBookings();
        return data;
      })
    );
  }

  getBookingUpdates(): Observable<Booking[]> {
    return this.bookings.asObservable();
  }

  getBookingSnapshot(): Booking[] {
    return this.bookings.getValue();
  }
}
