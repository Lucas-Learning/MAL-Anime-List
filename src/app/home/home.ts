import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  AuthFunc() {
    window.location.href = 'http://localhost:3000/auth/url';
  }
}
