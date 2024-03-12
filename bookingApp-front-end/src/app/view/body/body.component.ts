import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {StorageService} from "../../service/storage.service";

@Component({
  selector: 'app-body',
  template: `
    <app-form/>
    <ng-container *ngIf="storageService.isNonLogged() || storageService.isClientLoggedIn()">
      <div >
        <p class="m-2 font-bold text-amber-800 text-xl">Browse by property type</p>
        <div class="flex gap-2 border-b">
          <div *ngFor="let propertyType of propertyTypeList" >
            <div class="p-2 ">
              <img src="assets/images/{{propertyType}}.jpeg" class="rounded-lg hover:cursor-pointer"  (click)="handle(propertyType)" alt="">
              <p class="font-medium text-sm hover:cursor-pointer hover:text-blue-600">{{propertyType}}</p>
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
