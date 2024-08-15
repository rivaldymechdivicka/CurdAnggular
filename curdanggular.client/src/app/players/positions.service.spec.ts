import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Position } from "./position";

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  private apiURL = "https://localhost:7168/api/";

  constructor(private httpClient: HttpClient) { }

  getPositions(): Observable<Position[]> {
    return this.httpClient.get<Position[]>(this.apiURL + '/Positions')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Tambahkan tipe parameter 'error' untuk menghindari kesalahan TS7006
  errorHandler(error: any): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(errorMessage);
  }
}
