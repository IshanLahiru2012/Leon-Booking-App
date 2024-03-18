import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardMdImage,
  MatCardTitle
} from "@angular/material/card";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatProgressBar} from "@angular/material/progress-bar";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatCheckbox} from "@angular/material/checkbox";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormField,
    MatInputModule,
    MatInput,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatSelect,
    MatOption,
    MatIcon,
    MatButton,
    MatCardMdImage,
    MatMiniFabButton,
    MatProgressBar,
    MatCardActions,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckbox

  ],
  exports:[
    CommonModule,
    MatFormField,
    MatInputModule,
    MatInput,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatSelect,
    MatOption,
    MatIcon,
    MatButton,
    MatCardMdImage,
    MatMiniFabButton,
    MatProgressBar,
    MatCardActions,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckbox

    ]
})
export class MatImportModule { }
