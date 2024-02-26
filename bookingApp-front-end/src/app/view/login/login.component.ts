import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <header class="flex justify-between border-b p-4 bg-sky-400">
      <h1 class="font-bold bg-gradient-to-r from-orange-500 to-sky-500 bg-clip-text text-transparent hover:cursor-pointer"
          >Leon Booking App</h1>
      <div class="flex gap-3">
      </div>
    </header>
    <div class="flex flex-col items-center font-medium text-xl p-3 gap-3">
      <span class="text-center">Please sign in with your google account to manage your property</span>
      <div >
        <button class="border border-amber-400 pr-2 rounded-lg"><span class="p-2 font-bold">G</span>Sign in with Google</button>
      </div>
    </div>

  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
