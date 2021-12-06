import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// Declaration of the api url that provides data for the client app
const apiUrl = 'https://allmymovies.herokuapp.com/'

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  /**
   * 
   * @param http 
   */
  constructor(private http: HttpClient) {
  }
  /**
   * 
   * @param userDetails 
   * @returns a new user in the database
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe
      (
        catchError(this.handleError)
      );
  }

  /**
   * 
   * @param userDetails 
   * @returns a logged in user
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to get a list of all movies
   * @returns the list of movies
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call to get a specific movie by title
   * @returns all the info about one movie
   */
  public getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to get a director by name
   * @returns all the info about one director
   */
  public getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to get a genre by name
   * @returns all the info about one genre
   */
  public getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/:Genre', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to get one user
   * @param user 
   * @returns information about one user
   */
  public getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Get favorite movies for a user
  // No endpoint available in API for this 

  /**
   * API call to add a movie to the user's favorite movies
   * @param MovieId 
   * @returns updated list of favorite movies
   */
  public addFavoriteMovie(MovieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${user}/movies/${MovieId}`, MovieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * API call to update a user's profile
   * @param userDetails 
   * @returns updated user details
   */
  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${user}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * API call to remove a user's profile
   * @returns updates user database
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.delete(apiUrl + `users/${Username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })

    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * API call to remove a movie from a user's favorite movies list
   * @param id 
   * @returns updated list of favortie movies
   */
  public deleteFromFavMovie(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .delete(`${apiUrl}users/${Username}/movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * handles all call errors
   * @param error 
   * @returns 
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened, please try again later.'))
  }

  // Non-typed response extraction
  private extractResponseData(res: Response | {}): any {
    const body = res;
    return body || {};
  }
}