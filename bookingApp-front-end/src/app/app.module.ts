import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './view/main/main.component';
import { HeaderComponent } from './view/header/header.component';
import { FormComponent } from './view/form/form.component';
import { BodyComponent } from './view/body/body.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PropertyComponent } from './view/property/property.component';
import { PropertyListComponent } from './view/property-list/property-list.component';
import {PropertyService} from "./service/property.service";
import {PropertyServiceImpl} from "./service/property-service-impl";
import {HttpClientModule} from "@angular/common/http";
import { ImageListComponent } from './view/image-list/image-list.component';
import { LoginComponent } from './view/login/login.component';
import {RoutingModule} from "./routing.module";
import { RegisterComponent } from './view/register/register.component';
import { SignupComponent } from './view/signup/signup.component';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent, NzInputModule} from "ng-zorro-antd/input";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FormComponent,
    BodyComponent,
    PropertyComponent,
    PropertyListComponent,
    ImageListComponent,
    LoginComponent,
    RegisterComponent,
    SignupComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    NzFormControlComponent,
    NzFormItemComponent,
    NzInputDirective,
    NzFormDirective,
    NzButtonComponent,
    NzSpinComponent,
    NzRowDirective,
    NzColDirective,
    ReactiveFormsModule,
    NzInputGroupComponent,
    NzCheckboxComponent,
    NzInputModule
  ],
  // exports: [RouterModule],
  providers: [
    {provide: PropertyService, useClass:PropertyServiceImpl}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
