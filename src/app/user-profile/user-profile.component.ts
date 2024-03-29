import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favMovies: any = [];

  /**
   * 
   * @param fetchApiData 
   * @param router 
   * @param snackBar 
   * @param dialog 
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * gets user's profile information and favorite users
   */
  getUser(): void {
    let FavoriteMovies = localStorage.getItem('FavoriteMovies');
    let Username = localStorage.getItem('User');
    let Email = localStorage.getItem('Email');
    let Birthday = localStorage.getItem('Birthday');
    this.user = {
      'Username': Username,
      'Email': Email,
      'Birthday': Birthday,
      'FavoriteMovies': FavoriteMovies
    }
    this.getMovies();
  }

  /**
   * gets list of all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites();
    });
  }

  /**
   * filters movies according to them being added as favorite movies
   * @returns the user's favorite movies
   */
  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.user.FavoriteMovies.includes(movie._id)) {
        this.favMovies.push(movie);
      }
    });
    return this.user.FavoriteMovies;
  }

  /**
   * removes movies from user's favorite movies list
   * @param id 
   * @param title 
   */
  removeFavorites(id: string, title: string): void {
    this.fetchApiData.deleteFromFavMovie(id).subscribe((resp: any) => {
      let favMovies = resp.FavoriteMovies;
      localStorage.setItem('FavoriteMovies', favMovies);
      this.snackBar.open(`${title} has been removed from your favorites!`, 'OK', {
        duration: 2000
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  }

  /**
   * opens dialog to edit user details
   */
  editUser(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '350px'
    });
  }

  /**
   * deletes user's profile
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(() => {
      this.snackBar.open('Your account has been deleted!', 'Ok', {
        duration: 2000,
      });
      localStorage.clear();
      this.router.navigate(['/welcome']).then(() => {
        window.location.reload();
      });
    }
    );
  }
}
