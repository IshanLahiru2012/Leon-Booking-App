import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PropertyDto} from "../../dto/property.dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {InfoService} from "../../service/info.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookingService} from "../../service/booking.service";
import {BookDto} from "../../dto/book.dto";
import {BookReqDto} from "../../dto/book.req.dto";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-booking',
  template: `

    <div class="container">
      <mat-card>

        <mat-card-header class="bg-sky-400 mb-2 rounded-lg text-white">
          <mat-card-title>Booking</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <div class="grid grid-cols-12 border-amber-400 border-2 rounded-lg ">
            <div *ngIf="property.pictureList" class="col-span-5 image-container rounded-lg ">
              <img [src]="property.pictureList[0]" alt="Property Image" class="image">
            </div>
            <div *ngIf="!property.pictureList" class="col-span-5 image-container border-r-2 border-amber-100 rounded-lg text-wrap  text-center flex items-center justify-center">
              <span class="">No Image to Preview</span>
            </div>
            <div class="col-span-7 flex flex-col justify-between">
              <div class="flex flex-col">
                <span class="pl-4 font-bold"> {{property.name}}</span>
                <span class="text-gray-400 text-sm pl-5">{{property.city}}</span>
                <span class="text-gray-400 text-sm pl-5">{{property.type.toUpperCase()}}</span>
                <span class="text-gray-400 text-sm pl-5">Rooms: {{property.rooms}}</span>
                <span class="text-right font-bold pr-2">LKR. {{property.chargePerNight}}</span>
                <span class="text-right text-xs pr-2">For tonight</span>
              </div>
            </div>
          </div>
          <section class="example-section">
            <mat-checkbox class="example-margin" [(ngModel)]="checked">Preview Images</mat-checkbox>
          </section>
          <ng-container *ngIf="checked">
            <div class="grid grid-cols-4 gap-2 p-2">
              <div *ngFor="let image of property.pictureList" class="image-container">
                <img [src]="image" class="image" alt="image">
              </div>
            </div>
          </ng-container>
          <form class="form pt-2" [formGroup]="bookingForm">

            <mat-form-field class="example-form-field">
              <mat-label>Enter a date range</mat-label>
              <mat-date-range-input [rangePicker]="rangePicker">
                <input matStartDate placeholder="Start date" formControlName="startDate" >
                <input matEndDate placeholder="End date" formControlName="endDate" >
              </mat-date-range-input>
              <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
              <mat-datepicker-toggle matIconSuffix [for]="rangePicker"></mat-datepicker-toggle>
              <mat-date-range-picker #rangePicker >
                <mat-date-range-picker-actions>
                  <button mat-button matDateRangePickerCancel>Cancel</button>
                  <button mat-raised-button color="primary" matDateRangePickerApply>Apply</button>
                </mat-date-range-picker-actions>
              </mat-date-range-picker>
            </mat-form-field>

            <mat-form-field class="pl-2">
              <mat-label>Rooms</mat-label>
              <input matInput min="1" [max]="property.rooms" type="number" formControlName="rooms" placeholder="0">
              <mat-error *ngIf="bookingForm.get('rooms')?.hasError('required')">
                Booking rooms amount is <strong>required</strong>
              </mat-error>
            </mat-form-field>

          </form>
        </mat-card-content>
        <div class="bookBtn">
          <mat-card-actions>
            <button mat-raised-button type="submit" color="primary" class="ml-2" (click)="onBook()">Book</button>
          </mat-card-actions>
        </div>
      </mat-card>
    </div>


  `,
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit,OnDestroy{

  @Input()
  property! :PropertyDto;
  bookingForm! : FormGroup;
  imagePreview:boolean=false;
  checked:boolean=false;


  constructor(private formBuilder:FormBuilder,
              private route:ActivatedRoute,
              private router:Router,
              private infoService: InfoService,
              private bookingService:BookingService) {
  }


  bookSubscription!: Subscription;
  onBook() {
    if(this.bookingForm.invalid){
      console.log("Input are not given")
      return
    }
    let bookReqDto:BookReqDto = new BookReqDto(
      this.property.userId.valueOf(),
      this.property.id.valueOf(),
      this.bookingForm.get('startDate')?.value,
      this.bookingForm.get('endDate')?.value,
      this.bookingForm.get('rooms')?.value,
    );
     this.bookSubscription=this.bookingService.saveBookings(bookReqDto).subscribe(resp=>{
       this.router.navigateByUrl('/')
       console.log("successfully booked");
     },
       error => {
       console.log("Something went wrong");
       });
  }

  ngOnInit() {
    this.infoService.setIsBooking(true);
    this.route.params.subscribe(params=>{

      const paramData = params['property']
      if(paramData){
        this.property = JSON.parse(paramData) as PropertyDto;
      }
    });
    this.bookingForm = this.formBuilder.group({
      startDate:["",[Validators.required]],
      endDate:["",[Validators.required]],
      rooms:[null,[Validators.required]]
      }
    )
  }
  ngOnDestroy() {
    this.infoService.setIsBooking(false);
    this.bookSubscription.unsubscribe();
  }


}
