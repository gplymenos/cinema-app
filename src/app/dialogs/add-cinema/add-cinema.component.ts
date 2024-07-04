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
import { CinemaWithScreens } from '../../models/cinema.model';
import { CinemaService } from '../../services/cinema.service';
import { AddDialogComponent } from '../../shared/add-dialog/add-dialog.component';
import { MyErrorStateMatcher } from '../../validation-helper';

@Component({
  selector: 'app-add-cinema',
  standalone: true,
  imports: [
    AddDialogComponent,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-cinema.component.html',
  styleUrl: './add-cinema.component.scss',
})
export class AddCinemaComponent {
  // Services
  cinemaService = inject(CinemaService);
  dialogRef = inject(MatDialogRef<AddDialogComponent>);

  //variables
  nameControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    const cinemaName = this.nameControl.value;
    if (cinemaName) {
      const cinema = {
        name: cinemaName,
      } as CinemaWithScreens;

      this.cinemaService.addCinema(cinema).subscribe(() => {
        this.closeModal();
      });
    }
  }
}
