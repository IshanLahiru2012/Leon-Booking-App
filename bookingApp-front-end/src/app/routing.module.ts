import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ImageListComponent} from "./view/image-list/image-list.component";
import {LoginComponent} from "./view/login/login.component";
import {BodyComponent} from "./view/body/body.component";
import {PropertyListComponent} from "./view/property-list/property-list.component";
import {SignupComponent} from "./view/signup/signup.component";

const APP_ROUTES: Routes=[
  {
    path: 'login',
    component: LoginComponent,
  },
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
    path:'signin',
    component: LoginComponent
  },
  {
    path:'register',
    component: SignupComponent
  },
  {
    path:'',
    pathMatch: 'full',
    redirectTo: '/app'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
