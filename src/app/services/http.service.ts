import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

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

  handleError(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned error code ${error.status}: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
