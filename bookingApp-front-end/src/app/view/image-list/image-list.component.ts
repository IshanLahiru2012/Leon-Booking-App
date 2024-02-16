import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-image-list',
  template: `
    <p>
      image-list works!
    </p>
    
  `,
  styleUrl: './image-list.component.scss'
})
export class ImageListComponent implements OnInit{

  propertyImageList: string[] =[];
  imageListParam: string = 'a'
  constructor(private route:ActivatedRoute) {

  }

  ngOnInit(): void{
    this.route.params.subscribe(params=>{
      const imageListParam = params['propertyImageList']
      this.imageListParam =imageListParam;
      if(imageListParam){
        this.propertyImageList = imageListParam.split(',');
      }
    })
  }
}
