import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  template: `
    <p class="m-2 font-bold text-white text-xl">Browse by property type</p>
    <button class="bg-amber-200 border-2 active:bg-amber-800" (click)="handle()">click body</button>
    <div *ngIf="valid">
      <app-property-list/>
    </div>

  `,
  styleUrl: './body.component.scss'
})
export class BodyComponent {

  valid : boolean = false;

  handle(){
    this.valid = true;

  }

}
