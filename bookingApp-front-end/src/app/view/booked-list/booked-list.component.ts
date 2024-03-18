import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PropertyDto} from "../../dto/property.dto";
import {PropertyService} from "../../service/property.service";
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../../service/storage.service";
import {InfoService} from "../../service/info.service";
import {BookingService} from "../../service/booking.service";
import {BookDto} from "../../dto/book.dto";

@Component({
  selector: 'app-booked-list',
  template: `
    <div class="bg-amber-50 pt-2">
      <div class="grid sm:grid-cols-1 md:grid-cols-2  gap-2 px-2">
        <div *ngFor="let property of propertyList$ | async" >
          <app-property [property]="property"/>
        </div>
      </div>
    </div>
    <div *ngIf="(propertyList$ | async)?.length ===0" class="empty">
      <p> No Properties in your List</p>
    </div>
  `,
  styleUrl: './booked-list.component.scss'
})
export class BookedListComponent implements OnInit,OnDestroy{

  protected propertyList$!: Observable<PropertyDto[]>;

  constructor(private propertyService: PropertyService ,
              private route:ActivatedRoute,
              private infoService:InfoService) {
  }

  ngOnInit() {
    this.propertyList$ = this.propertyService.getPropertyByBookedUserId(StorageService.getUserId());
    this.infoService.setIsBookingList(true);
  }
  ngOnDestroy() {
    this.infoService.setIsBookingList(false);
  }
}
