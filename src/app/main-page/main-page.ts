import { Component, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth-service';
import { Modal } from "../modal/modal";

@Component({
  selector: 'app-main-page',
  imports: [Modal],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService) {}
  Token = sessionStorage.getItem('access_token');

  //maybe make an interface for this
  animeList = signal<any[]>([]);
  fullAnimeList = signal<any[]>([]);
  animeInfo = signal<any | null>(null);
  currentFilter = signal<'all' | 'completed' | 'watching' | 'on_hold' | 'dropped' | 'plan_to_watch'>('all');
  animeCache = signal<Record<number, any>>({});
  isModalVisible = false;

  ngOnInit() {
    const sessionId = this.authService.getSessionId();

    if (!sessionId) {
    console.error("No session ID found!");
    return;
    }
    this.http.get<any>("http://localhost:3000/myanimelist/list", {
      headers: {
        'x-session-id': sessionId
      }
    }).subscribe({ 
      next: (AnimeData) => {
        this.fullAnimeList.set(AnimeData.data);
        this.setFilter('all');
      },
      error: (error) => console.error(error)
  });
  }
  showModal() {
	this.isModalVisible = true;
  }

  hideModal() {
	this.isModalVisible = false;
  }

  setFilter(filter: 'all' | 'completed' | 'watching' | 'on_hold' | 'dropped' | 'plan_to_watch') {
    this.currentFilter.set(filter);

    if (filter === 'all') {
      this.animeList.set(this.fullAnimeList());
      return;
    }
    this.animeList.set(this.fullAnimeList().filter(a => a.list_status.status === filter));
  }

  getInfo(id: number){
    const cached = this.animeCache()[id];
    if (cached) {
      this.animeInfo.set(cached);
      return;
    }

    const sessionId = this.authService.getSessionId();

    if (!sessionId) {
    console.error("No session ID found!");
    return;
    }
    //Sends the id needed for the get request and sends back the data for the anime with that id
    this.http.post<any>("http://localhost:3000/myanimelist/info",{id},{
      headers: {
        'x-session-id': sessionId
      }
    }).subscribe({
      next: (data) =>{
        this.animeCache.update(cache => ({
          ...cache,
          [id]: data
        }));
        this.animeInfo.set(data);
        console.log("Anime info", this.animeInfo());
      },
      error: (error) => console.error(error)
    })
    
  }
  }
