import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  template: `
    <section class="dark:bg-sky-700">
      <header class="flex justify-between border-b p-4">
        <h1 class="font-bold bg-gradient-to-r from-orange-500 to-sky-500 bg-clip-text text-transparent hover:cursor-pointer"
            (click)="navigateToTheHome()">Leon Booking App</h1>
        <div class="flex gap-3">
          <button class="text-white hover:bg-sky-600 rounded px-2 py-1">List Your Property</button>
          <button class="border-2 px-1 bg-gradient-to-l from-emerald-500 to-cyan-400 text-gray-600 border-sky-700 rounded-xl hover:border-cyan-500 active:border-white" >Register</button>
          <button class="border-2 px-1 bg-gradient-to-l from-emerald-500 to-cyan-400 text-gray-600 border-sky-700 rounded-xl hover:border-cyan-500 active:border-white">Sign In</button>
        </div>
      </header>
      <app-form/>
    </section>

    <app-body *ngIf="true"/>
  `,
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private router: Router) {
  }
  navigateToTheHome(){
    this.router.navigateByUrl("/")
  }
}
