import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './view/main/main.component';
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
import { SignupComponent } from './view/signup/signup.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ListedPropertyComponent } from './view/listed-property/listed-property.component';
import { SavePropertyComponent } from './view/save-property/save-property.component';
import {NgZorroImportModule} from "./ng-zorro-import.module";
import {MatFormField} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatOption, MatSelect} from "@angular/material/select";






@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FormComponent,
    BodyComponent,
    PropertyComponent,
    PropertyListComponent,
    ImageListComponent,
    LoginComponent,
    SignupComponent,
    ListedPropertyComponent,
    SavePropertyComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgZorroImportModule,
    MatFormField,
    MatInputModule,
    MatInput,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatSelect,
    MatOption,

  ],

  providers: [
    {provide: PropertyService, useClass:PropertyServiceImpl},
    provideAnimationsAsync()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
