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
import { Screen } from '../../models/cinema.model';
import { DialogData } from '../../models/dialog-data.model';
import { CinemaService } from '../../services/cinema.service';
import { AddDialogComponent } from '../../shared/add-dialog/add-dialog.component';
import { MyErrorStateMatcher } from '../../validation-helper';

@Component({
  selector: 'app-add-screen',
  standalone: true,
  imports: [
    AddDialogComponent,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-screen.component.html',
  styleUrl: './add-screen.component.scss',
})
export class AddScreenComponent {
  // Services
  cinemaService = inject(CinemaService);
  dialogRef = inject(MatDialogRef<AddDialogComponent>);

  //variables
  nameControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  closeModal() {
    this.dialogRef.close();
  }

  submit() {
    this.nameControl.updateValueAndValidity();

    const screenName = this.nameControl.value;
    if (screenName) {
      const screen = {
        name: screenName,
      } as Screen;

      this.cinemaService
        .addScreen(this.data.selectedCinema.id, screen)
        .subscribe(() => {
          this.closeModal();
        });
    }
  }
}
