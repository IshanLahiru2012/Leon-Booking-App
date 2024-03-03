import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `

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
