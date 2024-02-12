import {Component, ElementRef, ViewChild} from '@angular/core';

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

  `,
  styleUrl: './form.component.scss'
})
export class FormComponent {
  checked = false;
  a = 20;

  @ViewChild('txt')
  txtElm ! : ElementRef<HTMLInputElement>;

  handleclick(eventdata: Event){
    for (let i = 0; i < 5; i++) {

    }

  }
  onClick(){
    this.txtElm.nativeElement.checked = true;
  }

}
