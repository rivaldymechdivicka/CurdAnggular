import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Player } from "./player";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  // Sesuaikan port apiURL dengan port yang ada di launchSettings.json
  private apiURL = "https://localhost:7168/api/players";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.httpClient.get<Player[]>(this.apiURL)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getPlayer(id: number): Observable<Player> {
    return this.httpClient.get<Player>(`${this.apiURL}/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createPlayer(player: Player): Observable<Player> {
    return this.httpClient.post<Player>(this.apiURL, player, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updatePlayer(id: number, player: Player): Observable<Player> {
    return this.httpClient.put<Player>(`${this.apiURL}/${id}`, player, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deletePlayer(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/${id}`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: any): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage); // Log error message to console
    return throwError(errorMessage); // Return observable with error message
  }
}
