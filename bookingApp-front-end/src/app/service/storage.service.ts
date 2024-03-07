import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }
  static saveToken(token:string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }
  static saveUser(user:any):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER,JSON.stringify(user));
  }
  static getToken(){
    return window.localStorage.getItem(TOKEN);
  }
  static getUser(){
    const storedUser = window.localStorage.getItem(USER);
    return storedUser? JSON.parse(storedUser):null;
  }
  static getUserId(){
    const item = window.localStorage.getItem(USER);
    return item? JSON.parse(item).id : null;
  }
  static getUserRole():string{
    const user = this.getUser();
    if(user == null)return "";
    return user.role;
  }
  static isNonLogged():boolean{
    return !(this.getUserRole() == "ADMIN" || this.getUserRole() == "CLIENT")
  }
  static isAdminLoggedIn():boolean{
    if(this.getToken() == null) return false;
    const userRole:string = this.getUserRole();
    return userRole == "ADMIN";
  }
  static isClientLoggedIn():boolean{
    if(this.getToken() == null) return false;
    const userRole:string = this.getUserRole();
    return userRole == "CLIENT";
  }
  static logout(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
