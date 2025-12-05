import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  imports: [],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  constructor(private http: HttpClient) {}
  Token = sessionStorage.getItem('access_token');
  //maybe make an interface for this
  animeList: any[] = [];

  getList() {
    this.http.get<any>("http://localhost:3000/myanimelist/list", {
      headers: {
        Authorization: `Bearer ${this.Token}`,
      }
    }).subscribe({ 
      next: (data) => {
        console.log("anime list", data);
        this.animeList = data;
        return this.animeList
      },
      error: (error) => console.error(error)
  });
  }
  }
