import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Booking } from '../../models/cinema.model';
import { BookingService } from '../../services/booking.service';
import { AddDialogComponent } from '../../shared/add-dialog/add-dialog.component';
import { MyErrorStateMatcher } from '../../validation-helper';

@Component({
  selector: 'app-add-booking',
  standalone: true,
  imports: [
    AddDialogComponent,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.scss',
})
export class AddBookingComponent {
  // Services
  bookingService = inject(BookingService);
  dialogRef = inject(MatDialogRef<AddDialogComponent>);

  //variables
  seatControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    const seatNumber = this.seatControl.value;
    if (seatNumber) {
      const booking = {
        seat: +seatNumber,
      } as Booking;

      this.bookingService.addBooking(booking).subscribe(() => {
        this.closeModal();
      });
    }
  }
}
