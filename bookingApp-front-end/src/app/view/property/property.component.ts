import {Component, Inject, Input} from '@angular/core';
import {PropertyDto} from "../../dto/property.dto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-property',
  template: `


    <div class="border-amber-400 border-2 rounded ">
      <div *ngIf="property.pictureList" >
        <img [src]="property.pictureList[0]" alt="Property Image">
      </div>
      <a class="pl-4 font-bold hover:underline hover:cursor-pointer" routerLink="/image" (click)="imageHandler()"> {{property.name}} </a>
      <p class="text-gray-400 text-sm pl-5">{{property.city}}</p>
    </div>

  `,
  styleUrl: './property.component.scss'
})
export class PropertyComponent {

  @Input()
  property !: PropertyDto;

  constructor(private router: Router) {
  }


  imageHandler() {
    this.router.navigateByUrl('/image')
  }
}
