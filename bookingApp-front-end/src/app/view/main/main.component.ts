import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../../service/storage.service";

@Component({
  selector: 'app-main',
  template: `
    <div class="contain">
      <div class="content">
        <section class="dark:bg-sky-700">
          <header class="flex justify-between border-b p-4">
            <h1 class="font-bold bg-gradient-to-r from-orange-500 to-sky-500 bg-clip-text text-transparent text-2xl hover:cursor-pointer"
                (click)="navigateToTheHome()" routerLinkActive="active">Leon Booking App</h1>
            <ng-container *ngIf="storageService.isNonLogged()">
              <div class="flex gap-3">
                <button class="text-white hover:bg-sky-600 rounded px-2 py-1" (click)="navigateToTheHome()">Dashboard</button>
                <button class="border-2 px-1 bg-gradient-to-l from-emerald-500 to-cyan-400 text-gray-600 border-sky-700 rounded-xl hover:border-cyan-500 active:border-white"
                        routerLink="/register" routerLinkActive="active">Register</button>
                <button class="border-2 px-1 bg-gradient-to-l from-emerald-500 to-cyan-400 text-gray-600 border-sky-700 rounded-xl hover:border-cyan-500 active:border-white"
                        routerLink="/login" routerLinkActive="active">Sign In</button>
              </div>
            </ng-container >
            <ng-container *ngIf="storageService.isAdminLoggedIn()">
              <div class="flex gap-3">
                <button class="text-white hover:bg-sky-600 rounded px-2 py-1" (click)="saveProperty()">List Your Property</button>
                <button class="text-white hover:bg-sky-600 rounded px-2 py-1" (click)="listedProperty()">Your Properties</button>
                <button class="border-2 px-1 bg-gradient-to-l from-emerald-500 to-cyan-400 text-gray-600 border-sky-700 rounded-xl hover:border-cyan-500 active:border-white"
                        (click)="logout()" routerLinkActive="active">Logout</button>
              </div>
            </ng-container>
            <ng-container *ngIf="storageService.isClientLoggedIn()">
              <div class="flex gap-3">
                <button class="text-white hover:bg-sky-600 rounded px-2 py-1" (click)="navigateToTheHome()">Dashboard</button>
                <button class="text-white hover:bg-sky-600 rounded px-2 py-1" (click)="onBooking()">Your Bookings</button>
                <button class="border-2 px-1 bg-gradient-to-l from-emerald-500 to-cyan-400 text-gray-600 border-sky-700 rounded-xl hover:border-cyan-500 active:border-white"
                        (click)="logout()" routerLinkActive="active">Logout</button>
              </div>
            </ng-container>
          </header>
        </section>
        <router-outlet></router-outlet>
      </div>
      <app-footer class="footer"></app-footer>
    </div>

      `,
  styleUrl: './main.component.scss'
})
export class MainComponent {

  storageService = StorageService;
  constructor(private router: Router) {

  }
  navigateToTheHome(){
    if(this.storageService.isAdminLoggedIn()){
      this.router.navigateByUrl("/listed-property");
    }else {
      this.router.navigateByUrl("/");
    }

  }

  logout(){
    StorageService.logout();
    this.router.navigateByUrl("/body")
  }
  listedProperty() {
    this.router.navigateByUrl("/listed-property")
  }

  saveProperty() {
    this.router.navigateByUrl("/save-property")
  }

  onBooking() {
    this.router.navigateByUrl("/booked-list")
  }
}
