import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  template: `

    <div>
      <nz-spin [nzSpinning]="isSpining" [nzSize]="'large'" nzTip="Working...">
        <div class="parent">
          <div class="child">
            <div nz-row class="imgDiv">
              <div nz-col nzSpan="24">
                <h1 style="margin-left: 100px">Sign Up</h1>
              </div>
            </div>

            <form nz-form [formGroup]="signupForm">
              <label for="email">E-mail</label>
              <nz-form-item>
                <nz-form-control nzHasFeedback nzErrorTip="enter email is not valid">
                  <input nz-input placeholder="Please Enter E-mail" id="email" formControlName="email" autocomplete="email"/>
                </nz-form-control>
              </nz-form-item>

              <label for="password">Password</label>
              <nz-form-item>
                <nz-form-control nzHasFeedback [nzErrorTip]="errorPass">
                  <input nz-input type="password" placeholder="Please Enter Password" id="password" formControlName="password"/>
                  <ng-template #errorPass let-control>
                    <ng-container *ngIf="control.hasError('required')">
                      password is required
                    </ng-container>
                    <ng-container *ngIf="control.hasError('pattern')">
                      password should contain 8 characors, 1 Lowercase, 1 Uppercase, 1 Number and 1 Special character
                    </ng-container>
                  </ng-template>
                </nz-form-control>
              </nz-form-item>

              <label for="confirmPassword">Confirm Password</label>
              <nz-form-item>
                <nz-form-control nzHasFeedback [nzErrorTip]="errorTpl" >
                  <input nz-input type="password" placeholder="Please Enter Password" id="confirmPassword" formControlName="confirmPassword"/>
                  <ng-template #errorTpl let-control>
                    <ng-container *ngIf="control.hasError('required')">
                      please enter again password
                    </ng-container>
                    <ng-container *ngIf="control.hasError('confirm')">
                      password didn't match
                    </ng-container>
                  </ng-template>
                </nz-form-control>
              </nz-form-item>

              <label for="userRole">User Role</label>
              <nz-form-item>
                <nz-form-control nzHasFeedback [nzErrorTip]="errorUser">
                  <nz-select nzPlaceHolder="please Select User Role" nzId="userRole" formControlName="userRole">
                    <nz-option *ngFor="let role of listOfRole" nzLabel="{{role}}" nzValue="{{role}}" ></nz-option>
                    <ng-template #errorUser let-control>
                      <ng-container *ngIf="control.hasError('required')">
                        please enter User Role
                      </ng-container>
                    </ng-template>
                  </nz-select>
                </nz-form-control>
              </nz-form-item>

              <button nz-button class="login-form-btn login-form-margin" [disabled]="signupForm.invalid"
                      (click)="register()" [nzType]="'primary'">Register</button>
              Already have an account ? <a routerLink="/login" class="text-amber-700">Login now</a>
            </form>
          </div>
        </div>
      </nz-spin>
    </div>


  `,
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isSpining: boolean =false;
  signupForm!:FormGroup;
  listOfRole = ["ADMIN","CLIENT"];


  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private message: NzMessageService,
    private router:Router) {
  }

  ngOnInit(){
    this.signupForm = this.fb.group({
      userRole:[null,[Validators.required]],
      email:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required , this.passwordMatch]]
    })
  }
  passwordMatch =(control: FormControl):{[s:string]: boolean}=>{
    if(!control.value){
      return {required:true};
    }else if (control.value !== this.signupForm.controls['password'].value){
      return {confirm:true, error:true};
    }
    return {}
  }
  register(){
    this.isSpining = true;
    this.authService.register(this.signupForm.value).subscribe(
      (resp)=>{
        this.isSpining =false
      console.log(resp);
      if(resp.id != null) {
        this.message.success("signUp succesful", {nzDuration: 3000});
        this.router.navigateByUrl("/login")
      }else {
        this.message.error("Something went wrong", {nzDuration:3000});
      }
    },
      (error)=>{
      this.message.error("Entered email already exist", {nzDuration:3000});

      });
  }


}
