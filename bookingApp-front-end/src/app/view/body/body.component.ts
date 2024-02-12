import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  template: `
    <p class="m-2 font-bold text-white text-xl">Browse by property type</p>
    <app-property/>


  `,
  styleUrl: './body.component.scss'
})
export class BodyComponent {

}
