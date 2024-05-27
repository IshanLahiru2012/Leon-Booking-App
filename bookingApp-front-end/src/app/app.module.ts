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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ImageListComponent } from './view/image-list/image-list.component';
import { LoginComponent } from './view/login/login.component';
import {RoutingModule} from "./routing.module";
import { SignupComponent } from './view/signup/signup.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ListedPropertyComponent } from './view/listed-property/listed-property.component';
import { SavePropertyComponent } from './view/save-property/save-property.component';
import {NgZorroImportModule} from "./ng-zorro-import.module";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { UpdatePropertyComponent } from './view/update-property/update-property.component';
import { BookingComponent } from './view/booking/booking.component';
import { BookedListComponent } from './view/booked-list/booked-list.component';
import { FooterComponent } from './view/footer/footer.component';
import {MatImportModule} from "./mat-import.module";
import { SearchListComponent } from './view/search-list/search-list.component';
import {AuthInterceptor} from "./intercept/authInterceptor";






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
    SavePropertyComponent,
    UpdatePropertyComponent,
    BookingComponent,
    BookedListComponent,
    FooterComponent,
    SearchListComponent

  ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      RoutingModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      NgZorroImportModule,
      MatImportModule
    ],

  providers: [
    {provide: PropertyService, useClass:PropertyServiceImpl},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
    provideAnimationsAsync()

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
