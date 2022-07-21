import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public setroles(role: string) {
    localStorage.setItem('role', role)
  }

  public getroles() {
    return localStorage.getItem('role');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token)
  }

  public getToken() {
    return localStorage.getItem('token')
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getroles() && this.getToken()
  }

}
