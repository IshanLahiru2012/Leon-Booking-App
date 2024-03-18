import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../../service/storage.service";

@Component({
  selector: 'app-body',
  template: `
    <app-form/>

    <ng-container *ngIf="storageService.isNonLogged() || storageService.isClientLoggedIn()">
      <div class="pb-2 pt-3 bg-blue-400">
        <div class="text-white text-5xl p-10">Find your next stay</div>
        <div class="text-white text-xl p-4">Search low prices on hotels, homes and much more...</div>
      </div>
      <div>
        <p class="m-2 font-bold text-amber-800 text-xl">Browse by property type</p>
        <div class="flex justify-between gap-2 border-b px-4 ">
          <div *ngFor="let propertyType of propertyTypeList" >
            <div class="p-2 ">
              <img src="assets/images/{{propertyType}}.jpeg" class="rounded-lg hover:cursor-pointer"  (click)="handle(propertyType)" alt="Property Type">
              <p class="font-medium text-sm hover:cursor-pointer hover:text-blue-600 " (click)="handle(propertyType)">{{propertyType}}</p>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
    <ng-container *ngIf="storageService.isAdminLoggedIn()">
      <app-property-list/>
    </ng-container>
    <router-outlet></router-outlet>

  `,
  styleUrl: './body.component.scss'
})
export class BodyComponent {

  navigating : boolean = false;
  propertyTypeList : string[] =['Hotel', 'Apartment', 'Resort', 'Villa'];
  protected storageService = StorageService;

  constructor(private router: Router) {
  }

  handle(type: string){
    this.navigating = true;
    this.router.navigate(['/property-list',type])


  }

}
