import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {PropertyDto} from "../../dto/property.dto";
import {ActivatedRoute} from "@angular/router";
import {PropertyService} from "../../service/property.service";

@Component({
  selector: 'app-search-list',
  template: `
    <div class="bg-amber-50 pt-2">
      <div class="grid sm:grid-cols-1 md:grid-cols-2  gap-2 px-2">
        <div *ngFor="let property of propertyList$ | async" >
          <app-property [property]="property"/>
        </div>
      </div>
    </div>
  `,
  styleUrl: './search-list.component.scss'
})
export class SearchListComponent implements OnInit{

  protected propertyList$!:Observable<PropertyDto[]>
  constructor(private route:ActivatedRoute, private propertyService:PropertyService) {
  }

  ngOnInit() {
    this.route.params.subscribe(param=>{
      const city = param['city'];
      this.propertyList$ = this.propertyService.getPropertyByCity(city)

    })
  }

}
