import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {PropertyDto} from "../../dto/property.dto";
import {StorageService} from "../../service/storage.service";
import {PropertyService} from "../../service/property.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-listed-property',
  template: `
    <div class="bg-amber-50 pt-2">
      <div class="grid sm:grid-cols-1 md:grid-cols-2  gap-2 px-2">
        <div *ngFor="let property of propertyList$ | async" >
          <app-property [property]="property"/>
        </div>
      </div>
    </div>
  `,
  styleUrl: './listed-property.component.scss'
})
export class ListedPropertyComponent implements OnInit{
  protected propertyList$!: Observable<PropertyDto[]>;

  constructor(private propertyService: PropertyService , private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.propertyList$ = this.propertyService.getPropertyByUserId(StorageService.getUserId());
  }
}
