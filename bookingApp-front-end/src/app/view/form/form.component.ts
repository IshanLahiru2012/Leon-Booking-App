import {Component, ElementRef, ViewChild} from '@angular/core';


@Component({
  selector: 'app-form',
  template: `
    <div class="pb-2 pt-3 bg-blue-400">
      <form class=" flex flex-col md:flex-row gap-1 m-2 p-1 bg-amber-500 rounded-lg max-w-5xl">
        <div class="relative w-full">
          <input type="text" class="rounded-md w-full py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500" placeholder="Where are you going">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt absolute left-3 top-1/2 transform -translate-y-1/2" viewBox="0 0 16 16">
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
          </svg>
        </div>
        <input name="date" type="text" class="rounded-md w-full px-1">
        <input type="text" class="rounded-md w-full px-1" placeholder="hello">
        <button class="border-2 px-1 bg-gradient-to-l from-emerald-500 to-cyan-400 text-gray-600 border-sky-700
                            rounded-2xl hover:border-cyan-500 active:border-white p-1">Search</button>
      </form>
    </div>

  `,
  styleUrl: './form.component.scss'
})
export class FormComponent {

  selectedDate: Date;

  constructor() {
    // Initialize selectedDate with today's date
    this.selectedDate = new Date();
  }

  onDateChange(event: any) {
    // This method will be called when the user selects a date
    console.log("Selected date:", this.selectedDate);
    // You can perform any further operations with the selected date here
  }


}
