import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_BASE_URL = 'http://localhost:8080/api/v1/auths'
  constructor(private http:HttpClient) {}

  register(signUpReq: any):Observable<any>{
    return this.http.post(this.API_BASE_URL+"/signup", signUpReq)
  }

}
