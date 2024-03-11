import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {finalize, Subscription} from "rxjs";
import {HttpClient, HttpEventType} from "@angular/common/http";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-save-property',
  template: `

    <div class="container">
      <mat-card>

        <mat-card-header>
          <mat-card-title>List A Property</mat-card-title>
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
              <mat-label aria-labelledby="ab">Property Type</mat-label>
              <mat-select id="ab" formControlName="type" [errorStateMatcher]="matcher">
                <mat-option *ngFor="let property of properties"
                            [value]="property.value">{{ property.value }}</mat-option>
              </mat-select>
              <mat-error *ngIf="saveForm.get('type')?.hasError('required')">
                Property Type is <strong>required</strong>
              </mat-error>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Price/day</mat-label>
              <input matInput type="number" formControlName="price" placeholder="0">
              <mat-error *ngIf="saveForm.get('price')?.hasError('required')">
                Property Price is <strong>required</strong>
              </mat-error>
            </mat-form-field>

            <div>
              <div class="image-upload ">
                <mat-label class="pl-3">Photo/s :</mat-label>
                <div class="flex justify-self-center gap-2">
                  <input type="file" class="file-input" [accept]="fileType" (change)="onFileSelected($event)"
                         #fileUpload multiple formControlName="photo">
                  {{upFiles.length || "No file uploaded yet. "}}
                  <button mat-mini-fab type="button" color="primary" class="upload-btn" (click)="fileUpload.click()">
                    <mat-icon>upload</mat-icon>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div class="p-2" *ngIf="onFileSelected">
            <div class="grid grid-cols-4">
              <div *ngFor="let upFile of upFiles" class="w-20">
                <img src="{{upFile}}" alt="">
              </div>
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button type="submit" color="primary" class="ml-2">Submit</button>
        </mat-card-actions>
      </mat-card>
    </div>

  `,
  styleUrl: './save-property.component.scss'
})
export class SavePropertyComponent implements OnInit{
  matcher = new MyErrorStateMatcher();
  fileType = "image/gif,image/jpeg";
  saveForm! : FormGroup;
  properties = [
    {value: 'Hotel'},
    {value: 'Apartment'},
    {value:  'Resort'},
    {value:  'Villa'},
  ];

  constructor(private formBuilder:FormBuilder,
              private http:HttpClient) {
  }


  ngOnInit() {
    this.saveForm = this.formBuilder.group({
      name:[null,[Validators.required]],
      city:[null,[Validators.required]],
      type:[null,[Validators.required]],
      price:[null,[Validators.required]],
      photo:[null,[Validators.required]]
    })

  }

  upFiles :  (FileList & Iterable<File>)[] =[];
  private formData = new FormData();


  onFileSelected(event:any) {


    const files:FileList = event.target.files;

    const listSize:number = event.target.files.length;

    if (listSize>0) {
    
      for(let i=0; i<listSize; i++){
        const reader = new FileReader();
        const file:File = event.target.files[i];
        this.formData.append("photo",file,file.name);


        reader.onload = (e:any)=>{
          this.upFiles![i] = e.target.result;
        }
        reader.readAsDataURL(file);
      }

    }
    console.log(listSize)
    console.log(this.saveForm.value)
  }

 }
