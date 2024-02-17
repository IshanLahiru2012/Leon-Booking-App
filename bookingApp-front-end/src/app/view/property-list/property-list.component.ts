import {Component, Inject} from '@angular/core';
import {PropertyService} from "../../service/property.service";

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

  constructor(@Inject(PropertyService) public propertyService: PropertyService) {
  }
}
