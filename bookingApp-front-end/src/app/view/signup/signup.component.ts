import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-signin',
  template: `

    <div class="bg" style="background-color: azure">
      <nz-spin [nzSpinning]="isSpining" [nzSize]="'large'" nzTip="Working...">
        <div class="parent">
          <div class="child">
            <div nz-row class="imgDiv">
              <div nz-col nzSpan="24">
                <h1 style="margin-left: 80px;">Sign Up</h1>
              </div>
            </div>

            <form nz-form>
              <nz-form-item>
                <nz-form-control nzHasFeedback nzErrorTip="enter email is not valid">
                  <input nz-input placeholder="email" id="email"/>
                </nz-form-control>
              </nz-form-item>

              <nz-form-item>
                <nz-form-control nzHasFeedback [nzErrorTip]="errorPass">
                  <input nz-input placeholder="password" id="password"/>
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

              <nz-form-item>
                <nz-form-control nzHasFeedback [nzErrorTip]="errorTpl" >
                  <input nz-input placeholder="password" id="password"/>
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

              <nz-form-item>
                <nz-form-control nzHasFeedback [nzErrorTip]="errorUser">
                  <input nz-input placeholder="Name" id="username"/>
                  <ng-template #errorUser let-control>
                    <ng-container *ngIf="control.hasError('required')">
                      please enter username
                    </ng-container>
                  </ng-template>
                </nz-form-control>
              </nz-form-item>

              <button nz-button class="login-form-btn login-form-margin" [nzType]="'primary'">Register</button>
              or <a routerLink="/login">Login now</a>
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


}
