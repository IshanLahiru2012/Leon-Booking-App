import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../../service/storage.service";

@Component({
  selector: 'app-main',
  template: `
    <section class="dark:bg-sky-700">
        <header class="flex justify-between border-b p-4">
          <h1 class="font-bold bg-gradient-to-r from-orange-500 to-sky-500 bg-clip-text text-transparent hover:cursor-pointer"
              routerLink="/body" routerLinkActive="active">Leon Booking App</h1>
          <ng-container *ngIf="storageService.isNonLogged()">
            <div class="flex gap-3">
              <button class="border-2 px-1 bg-gradient-to-l from-emerald-500 to-cyan-400 text-gray-600 border-sky-700 rounded-xl hover:border-cyan-500 active:border-white"
                      routerLink="/register" routerLinkActive="active">Register</button>
              <button class="border-2 px-1 bg-gradient-to-l from-emerald-500 to-cyan-400 text-gray-600 border-sky-700 rounded-xl hover:border-cyan-500 active:border-white"
                      routerLink="/login" routerLinkActive="active">Sign In</button>
            </div>
          </ng-container >
          <ng-container *ngIf="storageService.isAdminLoggedIn()">
            <div class="flex gap-3">
              <button class="text-white hover:bg-sky-600 rounded px-2 py-1">List Your Property</button>
              <button class="text-white hover:bg-sky-600 rounded px-2 py-1" (click)="listedProperty()">Your Properties</button>
              <button class="border-2 px-1 bg-gradient-to-l from-emerald-500 to-cyan-400 text-gray-600 border-sky-700 rounded-xl hover:border-cyan-500 active:border-white"
                       (click)="logout()" routerLinkActive="active">Logout</button>
            </div>
          </ng-container>
          <ng-container *ngIf="storageService.isClientLoggedIn()">
            <div class="flex gap-3">
              <button class="text-white hover:bg-sky-600 rounded px-2 py-1">Your Bookings</button>
              <button class="border-2 px-1 bg-gradient-to-l from-emerald-500 to-cyan-400 text-gray-600 border-sky-700 rounded-xl hover:border-cyan-500 active:border-white"
                       (click)="logout()" routerLinkActive="active">Logout</button>
            </div>
          </ng-container>
        </header>
    </section>
    <router-outlet></router-outlet>
      `,
  styleUrl: './main.component.scss'
})
export class MainComponent {
  protected storageService = StorageService
  constructor(private router: Router) {

  }
  navigateToTheHome(){
    this.router.navigateByUrl("/")
  }

  logout(){
    this.storageService.logout();
    this.router.navigateByUrl("/body")
  }
  listedProperty() {
    this.router.navigateByUrl("/listed-property")
  }
}
