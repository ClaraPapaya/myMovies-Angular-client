import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  /**
   * shows user exisiting routes in app
   * @param snackBar 
   * @param router 
   * @param toolbar 
   */
  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public toolbar: MatToolbarModule
  ) { }

  ngOnInit(): void {
  }

  /**
   * logs out user and routes back to welcome page
   */
  logoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('You have logged out successfully!', 'OK', {
      duration: 5000,
    });
  }
}
