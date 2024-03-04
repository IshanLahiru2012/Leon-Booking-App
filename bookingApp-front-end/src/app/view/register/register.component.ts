import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  template: `
    <p>works</p>

  `,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  constructor(private fb: NonNullableFormBuilder) {}

}


