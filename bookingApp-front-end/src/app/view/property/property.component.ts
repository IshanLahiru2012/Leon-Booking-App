import {Component, Inject, Input} from '@angular/core';
import {PropertyDto} from "../../dto/property.dto";
import {PropertyService} from "../../service/property.service";

@Component({
  selector: 'app-property',
  template: `
    <p class="pl-4 "> Property Name </p>
    <p class="text-gray-400 text-sm pl-5">Property address</p>
<!--    grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-2-->
<!--    <div class="image-grid">-->
<!--        <img src="assets/images/image1.jpeg">-->
<!--        <img src="assets/images/image2.jpeg">-->
<!--        <img src="assets/images/image3.jpeg">-->
<!--        <img src="assets/images/image4.jpeg">-->
<!--        <img src="assets/images/image5.jpeg">-->
<!--        <img src="assets/images/image6.jpeg">-->
<!--        <img src="assets/images/image7.jpeg">-->
<!--        <img src="assets/images/image8.jpeg">-->
<!--    </div>-->

  `,
  styleUrl: './property.component.scss'
})
export class PropertyComponent {
  @Input()
  property !: PropertyDto;

  constructor(@Inject(PropertyService) private propertyService: PropertyService) {
  }

}
