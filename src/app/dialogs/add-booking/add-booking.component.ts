import { Component, Inject, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogData } from '../../models/dialog-data.model';
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    const seatNumber = this.seatControl.value;
    if (seatNumber) {
      const booking = {
        seat: +seatNumber,
        screeningId: +this.data.selectedScreening,
      };

      this.bookingService.addBooking(booking).subscribe(() => {
        this.closeModal();
      });
    }
  }
}
