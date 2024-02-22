import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './view/main/main.component';
import { HeaderComponent } from './view/header/header.component';
import { FormComponent } from './view/form/form.component';
import { BodyComponent } from './view/body/body.component';
import {FormsModule} from "@angular/forms";
import { PropertyComponent } from './view/property/property.component';
import { PropertyListComponent } from './view/property-list/property-list.component';
import {PropertyService} from "./service/property.service";
import {PropertyServiceImpl} from "./service/property-service-impl";
import {HttpClientModule} from "@angular/common/http";
import { ImageListComponent } from './view/image-list/image-list.component';
import { RouterModule, Routes } from '@angular/router';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";


const APP_ROUTES: Routes=[

  {
    path: 'app',
    component: BodyComponent,
  },
  {
    path: 'image',
    component: ImageListComponent
  },
  {
    path:'property-list/:type',
    component: PropertyListComponent
  },
  {
    path:'',
    pathMatch: 'full',
    redirectTo: '/app'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FormComponent,
    BodyComponent,
    PropertyComponent,
    PropertyListComponent,
    ImageListComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule

  ],
  exports: [RouterModule],
  providers: [
    {provide: PropertyService, useClass:PropertyServiceImpl}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
