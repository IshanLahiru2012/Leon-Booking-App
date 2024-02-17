import {Component, Inject} from '@angular/core';
import {PropertyService} from "../../service/property.service";
import {PropertyDto} from "../../dto/property.dto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-property-list',
  template: `
    <div class="bg-amber-50 pt-2">
      <div class="grid sm:grid-cols-1 md:grid-cols-2  gap-2 px-2">
        <div *ngFor="let property of propertyService.getAllProperty()" >
            <app-property [property]="property"/>
        </div>
      </div>
    </div>

  `,
  styleUrl: './property-list.component.scss'
})
export class PropertyListComponent {

  protected propertyList: Array<PropertyDto> =[];

  constructor(@Inject(PropertyService) public propertyService: PropertyService , private route:ActivatedRoute) {
    this.route.params.subscribe(params =>{
      this.propertyList = this.propertyService.getPropertyByType(params['type'])
      console.log(this.propertyList.length)
    })
  }
}
