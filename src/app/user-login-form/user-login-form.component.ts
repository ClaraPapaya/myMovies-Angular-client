import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() loginData = { Username: '', Password: '' };

  /**
   * 
   * @param fetchApiData 
   * @param dialogRef 
   * @param snackBar 
   * @param router 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * logs user in and stores data in local storage
   */
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
