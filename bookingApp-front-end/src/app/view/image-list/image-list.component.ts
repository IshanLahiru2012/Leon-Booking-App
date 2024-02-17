import { Component, OnInit} from '@angular/core';
import {ImageListService} from "../../service/image.list.service";
import {PropertyDto} from "../../dto/property.dto";

@Component({
  selector: 'app-image-list',
  template: `
    <p class="pl-3 font-bold text-xl" >{{property.name}}</p>
    <p class="text-gray-400 text-sm pl-3">{{property.city}}</p>
    <div class="grid grid-cols-4 gap-2 p-2">
      <div *ngFor="let image of property.pictureList" class="image-container">
        <img [src]="image" class="image">
      </div>
    </div>

  `,
  styleUrl: './image-list.component.scss'
})
export class ImageListComponent implements OnInit{

  property!: PropertyDto;
  constructor(private imageListService: ImageListService) {

  }
  ngOnInit(): void{
    this.property = this.imageListService.getProperty();
  }
}
