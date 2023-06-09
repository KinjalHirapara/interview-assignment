import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  // private apiUrl = 'http://localhost:3000/posts';

  private baseUrl = 'http://localhost:3000'; // Replace with your API base URL

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  post(endpoint: string, data: any) {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post(url, data).pipe(
      catchError(this.handleError)
    );
  }

  delete(endpoint: string) {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Handle and log the error here
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
