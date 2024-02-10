import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  template: `
    <form class=" flex flex-col md:flex-row gap-1 m-2 p-1 bg-amber-500 rounded-lg max-w-5xl">
      <input type="text" class="rounded-xl w-full p-1">
      <input type="text" class="rounded-xl w-full p-1">
      <input type="text" class="rounded-xl w-full p-1">
      <button class="border-2 px-1 bg-gradient-to-l from-emerald-500 to-cyan-400 text-gray-600 border-sky-700
                            rounded-2xl hover:border-cyan-500 active:border-white p-1">Search</button>


    </form>
    <h1>{{title}}</h1>
    <button class="border-2" (click)="handleclick()">click me </button>
  `,
  styleUrl: './form.component.scss'
})
export class FormComponent {
  title= "hello test";

  handleclick(){

    if(this.title != "changed"){
      this.title = "changed";
    }else {
      this.title = "first";
    }

  }

}
