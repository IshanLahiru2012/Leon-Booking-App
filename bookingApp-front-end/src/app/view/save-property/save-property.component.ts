import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-save-property',
  template: `

    <mat-card>
      <mat-card-header>
        <mat-card-title >List A Property</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form class="form" [formGroup]="saveForm">
          <mat-form-field class="full-width">
            <mat-label>Property Name</mat-label>
            <input type="text" matInput formControlName="name" [errorStateMatcher]="matcher"
                   placeholder="Ex. Property Name">
            <mat-error *ngIf="saveForm.get('name')?.hasError('required')">
              Property Name is <strong>required</strong>
            </mat-error>
          </mat-form-field>
          <mat-form-field class="full-width">
            <mat-label>City</mat-label>
            <input type="text" matInput formControlName="city" [errorStateMatcher]="matcher"
                   placeholder="Ex. City">
            <!--            <mat-error *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')">-->
            <!--              Please enter a valid email address-->
            <!--            </mat-error>-->
            <mat-error *ngIf="saveForm.get('city')?.hasError('required')">
              City Name is <strong>required</strong>
            </mat-error>
          </mat-form-field>
          <mat-form-field class="full-width">
            <mat-label>Property Type</mat-label>
            <mat-select formControlName="type" [errorStateMatcher]="matcher">
              <mat-option *ngFor="let food of foods" [value]="food.value" >{{ food.value }}</mat-option>
            </mat-select>
            <mat-error *ngIf="saveForm.get('type')?.hasError('required')">
              Property Type is <strong>required</strong>
            </mat-error>
          </mat-form-field>
        </form>
      </mat-card-content>
    </mat-card>





  `,
  styleUrl: './save-property.component.scss'
})
export class SavePropertyComponent implements OnInit{
  matcher = new MyErrorStateMatcher();
  saveForm! : FormGroup;
  foods = [
    {value: 'Steak'},
    {value: 'Pizza'},
    {value:  'Tacos'},
  ];

  constructor(private formBuilder:FormBuilder) {
  }


  ngOnInit() {
    this.saveForm = this.formBuilder.group({
      name:[null,[Validators.required]],
      city:[null,[Validators.required]],
      type:[null,[Validators.required]]
    })
  }


}
