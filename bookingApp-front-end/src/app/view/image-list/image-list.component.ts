import { Component, OnInit} from '@angular/core';
import {ImageListService} from "../../service/image.list.service";

@Component({
  selector: 'app-image-list',
  template: `
    <p class="p-2 font-bold text-xl" >{{propertyName}} Images</p>
    <div class="grid grid-cols-4 gap-2 p-2">
      <div *ngFor="let image of propertyImageList" class="image-container">
        <img [src]="image" class="image">
      </div>
    </div>

  `,
  styleUrl: './image-list.component.scss'
})
export class ImageListComponent implements OnInit{

  propertyImageList: string[] =[];
  propertyName!: string;
  constructor(private imageListService: ImageListService) {

  }

  ngOnInit(): void{
    this.propertyImageList = this.imageListService.getProperty().pictureList;
    this.propertyName = this.imageListService.getProperty().name;
  }
}
