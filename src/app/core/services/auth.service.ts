import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn() {
    return (this.getSessionData() ? true : false);
  }

  setSessionData(data: any) {
    localStorage.setItem('sessionToken', data)
  }

  getSessionData() {
    return (localStorage.getItem('sessionToken') ?  localStorage.getItem('sessionToken') : '');
  }

}
