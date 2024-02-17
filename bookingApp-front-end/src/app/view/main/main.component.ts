import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <section class="dark:bg-sky-700">
      <app-header/>
      <app-form/>
    </section>
    <app-body/>
  `,
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
