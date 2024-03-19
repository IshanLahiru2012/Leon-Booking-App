import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PropertyDto} from "../../dto/property.dto";
import {Router} from "@angular/router";
import {InfoService} from "../../service/info.service";
import {StorageService} from "../../service/storage.service";
import {PropertyService} from "../../service/property.service";
import {BookingService} from "../../service/booking.service";
import {BookDto} from "../../dto/book.dto";
import {BookListDto} from "../../dto/bookList.dto";

@Component({
  selector: 'app-property',
  template: `


    <div class="grid grid-cols-12 border-amber-400 border-2 rounded-lg ">
      <div *ngIf="property.pictureList" class="col-span-5 image-container rounded-lg ">
        <img [src]="property.pictureList[0]" alt="Property Image" class="image hover:cursor-pointer "
             [routerLink]="['/image',{prop:JSON.stringify(property)}]">
      </div>
      <div *ngIf="!property.pictureList" class="col-span-5 image-container border-r-2 border-amber-100 rounded-lg text-wrap  text-center flex items-center justify-center">
        <span class="">No Image to Preview</span>
      </div>
      <div class="col-span-7 flex flex-col justify-between">
        <div class="flex flex-col">
          <a class="pl-4 pt-1 font-bold text-l text-amber-700 hover:underline hover:cursor-pointer" [routerLink]="['/image',{prop:JSON.stringify(property)}]"> {{property.name}}</a>
          <span class="text-gray-400 text-sm pl-5">{{property.city}}</span>
          <span class="text-gray-400 text-sm pl-5">{{property.type}}</span>
          <span class="text-gray-400 text-sm pl-5" *ngIf="booking">Rooms:{{booking.rooms}}</span>
          <span class="text-gray-400 text-sm pl-5" *ngIf="!booking">Rooms:{{property.rooms}}</span>
          <span class="text-right font-bold pr-2">LKR. {{property.chargePerNight}}</span>
          <span class="text-right text-xs pr-2">For tonight</span>
          <ng-container *ngIf="storageService.isClientLoggedIn() && booking">
            <span class="text-gray-400 text-sm pl-5">From : {{booking.startDate}}</span>
            <span class="text-gray-400 text-sm pl-5">To   : {{booking.endDate}}</span>
          </ng-container>
        </div>
        <div class="text-right m-1">
          <ng-container *ngIf="storageService.isClientLoggedIn() && infoService.getIsBookingList()">
            <button class="bg-amber-500 hover:bg-amber-600 active:bg-amber-400 text-white border
                    font-bold py-2 px-4 rounded" id="cancelBtn" (click)="onCancel(booking)">Cancel</button>
          </ng-container>
          <ng-container *ngIf="!storageService.isAdminLoggedIn() && !infoService.getIsBooking() && !infoService.getIsBookingList()">
            <button class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-400 text-white border
                    font-bold py-2 px-4 rounded" id="bookBtn" (click)="onBook(property)">Book</button>
          </ng-container>
          <ng-container *ngIf="storageService.isAdminLoggedIn() && !infoService.getIsEditing()">
            <button class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-400 text-white border
            font-bold py-2 px-4 rounded" id="editBtn" (click)="onUpdate(property)">Edit</button>
          </ng-container>
          <ng-container *ngIf="storageService.isAdminLoggedIn() && infoService.getIsEditing()">
            <button class="bg-red-500 hover:bg-red-700 active:bg-red-400 text-white border
            font-bold py-2 px-4 rounded" id="deleteBtn" (click)="onDelete(property)">Delete</button>
          </ng-container>
        </div>

      </div>
    </div>

  `,
  styleUrl: './property.component.scss'
})
export class PropertyComponent implements OnInit{

  @Input()
  property !: PropertyDto;
  booking!:BookDto;
  storageService= StorageService;
  protected readonly JSON = JSON;

  constructor(private router: Router,
              protected infoService:InfoService,
              private propertyService:PropertyService,
              private bookingService:BookingService) {

  }
  ngOnInit() {

    if(this.infoService.getIsBookingList()){
      this.bookingService.getBookedPropertyId(this.property.id).subscribe(resp=>{
        this.booking =resp;
      });
    }

  }

  onUpdate(property:PropertyDto) {
    this.infoService.setIsEditing(true)
    this.router.navigate(['/update-property',{property:JSON.stringify(property)}]);
  }
  onDelete(property: PropertyDto) {
    this.propertyService.deleteProperty(property.id.valueOf()).subscribe(resp=>{
      console.log("Succesfully deleted");
      this.router.navigateByUrl("/listed-property")
    },
      error => {
      console.log("Something went wrong"+error);
      })
  }

  onBook(property:PropertyDto) {
    if(this.storageService.getUserId()==null){
      this.router.navigateByUrl("/signin")
      return;
    }
    this.router.navigate(["/booking",{property:JSON.stringify(property)}])
  }

  onCancel(booking:BookDto) {
    this.bookingService.deleteBooking(booking.bookingId).subscribe(resp=>{
      console.log('Successfully Canceled');
      const currentUrl = this.router.url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    },error => {
      console.log("Something went wrong "+error);
    })

  }


}
