import {Component, Input, OnInit} from '@angular/core';
import {InfoService} from "../../service/info.service";
import {PropertyDto} from "../../dto/property.dto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-image-list',
  template: `
    <p class="pl-3 font-bold text-xl text-amber-700 mt-2" >{{property.name}}</p>
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
  constructor(private imageListService: InfoService, private route:ActivatedRoute) {

  }
  ngOnInit(): void{

    this.route.params.subscribe(param=>{
      const paramData = param['prop'];
      this.property = JSON.parse(paramData) as PropertyDto;
    })

  }
}
