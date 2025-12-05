import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }
  getToken(): string | null {
    return sessionStorage.getItem('access_token');
  }
}
