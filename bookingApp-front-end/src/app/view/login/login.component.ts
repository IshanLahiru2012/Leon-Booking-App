import { Component } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  template: `

    <div>
      <nz-spin [nzSpinning]="isSpinig" [nzSize]="'large'" nzTip="working...">
        <div class="parent">
          <div class="child">
            <div nz-row class="imgDiv">
              <div nz-col nzSpan="24">
                <h1 style="margin-left: 100px;">Login</h1>
              </div>
            </div>
            <form nz-form  [formGroup]="loginForm">
              <nz-form-item>
                <nz-form-control nzErrorTip="Please input your email!">
                  <nz-input-group nzPrefixIcon="user">
                    <input type="text" nz-input placeholder="email" id="email" formControlName="email" />
                  </nz-input-group>
                </nz-form-control>
              </nz-form-item>
              <nz-form-item>
                <nz-form-control nzErrorTip="Please input your Password!">
                  <nz-input-group nzPrefixIcon="lock">
                    <input type="password" nz-input placeholder="Password"  id="password" formControlName="password" />
                  </nz-input-group>
                </nz-form-control>
              </nz-form-item>
<!--              <div nz-row class="login-form-margin">-->
<!--                <div nz-col [nzSpan]="12">-->
<!--                  <label nz-checkbox formControlName="remember">-->
<!--                    <span>Remember me</span>-->
<!--                  </label>-->
<!--                </div>-->
<!--                <div nz-col [nzSpan]="12">-->
<!--                  <a class="login-form-forgot">Forgot password</a>-->
<!--                </div>-->
<!--              </div>-->
              <button nz-button class="login-form-button login-form-margin" [disabled]="loginForm.invalid" (click)="login()" [nzType]="'primary'">Log in</button>
              Or
              <a routerLink="/register">register now!</a>
            </form>
          </div>
        </div>
      </nz-spin>
    </div>


  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSpinig: boolean = false;
  loginForm! : FormGroup;


  constructor(private fb: FormBuilder) {}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required]],
    })
  }

  login() {
    console.log(this.loginForm.value)
  }
}
