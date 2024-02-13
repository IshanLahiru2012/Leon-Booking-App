import {Component, Inject, Input} from '@angular/core';
import {PropertyDto} from "../../dto/property.dto";

@Component({
  selector: 'app-property',
  template: `


    <div class="border-amber-400 border-2 rounded p-2">
      <div *ngIf="property.pictureList" >
        <img [src]="property.pictureList[0]" alt="Property Image">
      </div>
      <p class="pl-4 "> {{property.name}} </p>
      <p class="text-gray-400 text-sm pl-5">{{property.city}}</p>
    </div>

  `,
  styleUrl: './property.component.scss'
})
export class PropertyComponent {

  @Input()
  property !: PropertyDto;


}
