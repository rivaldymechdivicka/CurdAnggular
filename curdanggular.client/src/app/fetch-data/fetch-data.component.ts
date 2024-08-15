import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent implements OnInit {
  public data: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData().subscribe(result => {
      this.data = result;
    });
  }

  fetchData(): Observable<any> {
    return this.http.get('https://api.example.com/data');
  }
}
