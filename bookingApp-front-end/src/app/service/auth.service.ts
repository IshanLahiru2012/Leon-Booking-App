import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_BASE_URL = 'http://localhost:8080/api/v1/auths';

  private readonly TOKEN_KEY = 'auth_token';
  constructor(private http:HttpClient) {}

  register(signUpReq: any):Observable<any>{
    return this.http.post(this.API_BASE_URL+"/signup", signUpReq)
  }
  login(loginReq: any):Observable<any>{
    return this.http.post(this.API_BASE_URL+"/login", loginReq);
  }
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
