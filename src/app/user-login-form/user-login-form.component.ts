import { Component, OnInit, Input } from '@angular/core';
// Closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
// Brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// Adds the router functionality
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  // Log user in and store data in local storage
  loginUser(): void {
    this.router.navigate(['movies']);
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        this.dialogRef.close();
        localStorage.setItem('Username', result.Username);
        localStorage.setItem('Password', result.Password);
        localStorage.setItem('token', result.token);
        console.log(localStorage.getItem('Username'))
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000,
        });
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      }
    );
  }
};
