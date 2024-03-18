import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzImageGroupComponent} from "ng-zorro-antd/image";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzSpinComponent,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzButtonComponent,
    NzColDirective,
    NzRowDirective,
    NzFormDirective,
    NzInputDirective,
    NzOptionComponent,
    NzSelectComponent,
    NzImageGroupComponent,
  ],
  exports:[
    NzSpinComponent,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    NzButtonComponent,
    NzColDirective,
    NzRowDirective,
    NzFormDirective,
    NzInputDirective,
    NzOptionComponent,
    NzSelectComponent,
    NzImageGroupComponent,
    ]
})
export class NgZorroImportModule { }
