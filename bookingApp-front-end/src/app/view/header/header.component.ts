import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="flex justify-between border-b p-4">
      <h1 class="font-bold bg-gradient-to-r from-orange-500 to-sky-500 bg-clip-text text-transparent">Leon Booking App</h1>
      <div class="flex gap-3">
        <button>List Your Hotel</button>
        <button class="border-2 px-1" >Register</button>
        <button class="border-2 px-1">Sign In</button>
      </div>

    </header>
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
