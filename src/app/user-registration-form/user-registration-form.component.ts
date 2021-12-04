import { Component, OnInit, Input } from '@angular/core';
// Closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// Used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // Send the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      this.dialogRef.close(); // Close the modal on success
      console.log(response);
      this.snackBar.open('User registration successful!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response)
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
};