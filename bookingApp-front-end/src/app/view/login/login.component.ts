import { Component } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {StorageService} from "../../service/storage.service";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

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
                  <label for="email">E-mail</label>
                  <nz-input-group nzPrefixIcon="user">
                    <input type="text" nz-input placeholder="Please Enter email" id="email" formControlName="email" />
                  </nz-input-group>
                </nz-form-control>
              </nz-form-item>
              <nz-form-item>
                <nz-form-control nzErrorTip="Please input your Password!">
                  <label for="password">Password</label>
                  <nz-input-group nzPrefixIcon="lock">
                    <input type="password" nz-input placeholder="Please Enter Password"  id="password" formControlName="password" />
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
              Don't have an account ?
              <a routerLink="/register" class="text-amber-700">register now!</a>
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


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router,
              private message: NzMessageService) {}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required]],
    })
  }

  login() {
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe(
      (resp)=>{
        console.log(resp);
        if(resp.userId !== null){
          const user ={
            id : resp.userId,
            role: resp.userRole
          }
          StorageService.saveUser(user);
          StorageService.saveToken(resp.jwt);
          if (StorageService.isAdminLoggedIn()){
            this.message.success("Admin Login Successfully", {nzDuration:5000})
            this.router.navigateByUrl("/listed-property")
          }else if(StorageService.isClientLoggedIn()){
            this.message.success("Client Login Successfully", {nzDuration:5000})
            this.router.navigateByUrl("/body");
          }else {
            console.log("in")
            this.message.error("Invalid username or Password");
          }

        }
      },
      (error)=>{
        this.message.error("Invalid username or Password");
      });
  }
}
