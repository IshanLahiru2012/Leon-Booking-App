import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PropertyDto} from "../../dto/property.dto";
import {Router} from "@angular/router";
import {InfoService} from "../../service/info.service";
import {StorageService} from "../../service/storage.service";
import {PropertyService} from "../../service/property.service";

@Component({
  selector: 'app-property',
  template: `


    <div class="grid grid-cols-12 border-amber-400 border-2 rounded-lg ">
      <div *ngIf="property.pictureList" class="col-span-5 image-container rounded-lg ">
        <img [src]="property.pictureList[0]" alt="Property Image" class="image hover:cursor-pointer "
             [routerLink]="['/image']" (click)="setProperty(property)">
      </div>
      <div *ngIf="!property.pictureList" class="col-span-5 image-container border-r-2 border-amber-100 rounded-lg text-wrap  text-center flex items-center justify-center">
        <span class="">No Image to Preview</span>
      </div>
      <div class="col-span-7 flex flex-col justify-between">
        <div class="flex flex-col">
          <a class="pl-4 font-bold hover:underline hover:cursor-pointer" [routerLink]="['/image']" (click)="setProperty(property)"> {{property.name}}</a>
          <p class="text-gray-400 text-sm pl-5">{{property.city}}</p>
          <p class="text-gray-400 text-sm pl-5">{{property.type}}</p>
          <p class="text-gray-400 text-sm pl-5">Rooms: {{property.rooms}}</p>
          <p class="text-right font-bold pr-2">LKR. {{property.chargePerNight}}</p>
          <p class="text-right text-xs pr-2">For tonight</p>
        </div>
        <div class="text-right m-1">
          <ng-container *ngIf="!storageService.isAdminLoggedIn() && !infoService.getIsBooking()">
            <button class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-400 text-white border
                    font-bold py-2 px-4 rounded" id="bookBtn" (click)="onBook(property)">Book</button>
          </ng-container>
          <ng-container *ngIf="storageService.isAdminLoggedIn() && !infoService.getIsEditing()">
            <button class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-400 text-white border
            font-bold py-2 px-4 rounded" id="editBtn" (click)="onUpdate(property)">Edit</button>
          </ng-container>
          <ng-container *ngIf="storageService.isAdminLoggedIn() && infoService.getIsEditing()">
            <button class="bg-red-500 hover:bg-red-700 active:bg-red-400 text-white border
            font-bold py-2 px-4 rounded" id="editBtn" (click)="onDelete(property)">Delete</button>
          </ng-container>
        </div>

      </div>
    </div>

  `,
  styleUrl: './property.component.scss'
})
export class PropertyComponent{

  @Input()
  property !: PropertyDto;
  storageService= StorageService;

  constructor(private router: Router,
              protected infoService:InfoService,
              private propertyService:PropertyService) {
  }
  setProperty(property:PropertyDto){
    this.infoService.setProperty(property);
  }

  onUpdate(property:PropertyDto) {
    this.infoService.setIsEditing(true)
    this.router.navigate(['/update-property',{property:JSON.stringify(property)}]);
  }
  onDelete(property: PropertyDto) {
    console.log(property.id.valueOf())
    this.propertyService.deleteProperty(property.id.valueOf()).subscribe(resp=>{
      console.log("Succesfully deleted");
      this.router.navigateByUrl("/listed-property")
    },
      error => {
      console.log("Something went wrong"+error);
      })
  }

  onBook(property:PropertyDto) {
    console.log(property)
    this.router.navigate(["/booking",{property:JSON.stringify(property)}])
  }
}
