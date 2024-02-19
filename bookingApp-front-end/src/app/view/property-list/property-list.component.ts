import {Component, OnInit} from '@angular/core';
import {PropertyService} from "../../service/property.service";
import {PropertyDto} from "../../dto/property.dto";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-property-list',
  template: `
    <div class="bg-amber-50 pt-2">
      <div class="grid sm:grid-cols-1 md:grid-cols-2  gap-2 px-2">
        <div *ngFor="let property of propertyList$ | async" >
            <app-property [property]="property"/>
        </div>
      </div>
    </div>

  `,
  styleUrl: './property-list.component.scss'
})
export class PropertyListComponent implements OnInit{

  protected propertyList$!: Observable<PropertyDto[]>;

  constructor(private propertyService: PropertyService , private route:ActivatedRoute) {

  }
  ngOnInit(){
    this.route.params.subscribe(params =>{
      const type = params['type'];
      if(type){
        this.propertyList$ = this.propertyService.getPropertyByType(params['type'])
      }
    })
  }
}
