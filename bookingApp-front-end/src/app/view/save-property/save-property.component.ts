import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {finalize, Subscription} from "rxjs";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {PropertyDto} from "../../dto/property.dto";
import {PropertyReqDto} from "../../dto/propertyReq.dto";
import {StorageService} from "../../service/storage.service";
import {PropertyService} from "../../service/property.service";
import {Router} from "@angular/router";

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

        <mat-card-header class="bg-emerald-400 mb-2 rounded-lg text-white">
          <mat-card-title>List A Property</mat-card-title>
        </mat-card-header>

        <mat-card-content>

          <form class="form" [formGroup]="saveForm">

            <mat-form-field class="full-width ">
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
              <input matInput min="1" type="number" formControlName="price" placeholder="0">
              <mat-error *ngIf="saveForm.get('price')?.hasError('required')">
                Property Price is <strong>required</strong>
              </mat-error>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Rooms</mat-label>
              <input matInput min="1" type="number" formControlName="rooms">
              <mat-error *ngIf="saveForm.get('rooms')?.hasError('required')">
                Room amount is <strong>required</strong>
              </mat-error>
              <mat-error *ngIf="!saveForm.get('rooms')?.hasError('required') && saveForm.get('rooms')?.hasError('min')">
                Room amount should be <strong>Positive</strong>
              </mat-error>
            </mat-form-field>

            <div>
              <div class="image-upload ">
                <mat-label class="pl-3">Photo/s :</mat-label>
                <div class="flex justify-self-center gap-2">
                  <input type="file" class="file-input" [accept]="fileType" (change)="onFileSelected($event)"
                         #fileUpload multiple formControlName="photo">
                  {{previewFile.length ? (previewFile.length + " Files"): "No file uploaded yet. "}}
                  <button mat-mini-fab type="button" color="primary" class="upload-btn" (click)="fileUpload.click()">
                    <mat-icon>upload</mat-icon>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <ng-container *ngIf="isFileSelected">
            <div class="grid grid-cols-4 p-2 gap-1 border border-cyan-300">
              <div *ngFor="let file of previewFile" class="bg-emerald-400 overflow-y-hidden image-container">
                <img src="{{file}}" alt=""  class="image">
              </div>
            </div>
          </ng-container>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button type="submit" color="primary" class="ml-2" (click)="onSave()">Submit</button>
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
  previewFile :  (FileList & Iterable<File>)[] =[];
  files:FileList|null = null;
  isFileSelected: boolean=false;
  properties = [
    {value: 'Hotel'},
    {value: 'Apartment'},
    {value:  'Resort'},
    {value:  'Villa'},
  ];

  constructor(private formBuilder:FormBuilder,
              private http:HttpClient,
              private propertyService: PropertyService,
              private router:Router) {
  }


  ngOnInit() {
    this.saveForm = this.formBuilder.group({
      name:[null,[Validators.required]],
      city:[null,[Validators.required]],
      type:[null,[Validators.required]],
      price:[null,[Validators.required]],
      rooms:[null,[Validators.required, Validators.min(1)]],
      photo:[null]
    })

  }

  onFileSelected(event:any) {

    this.isFileSelected =true;
    this.files = event.target.files;
    const listSize:number = event.target.files.length;

    if (listSize>0) {
      for(let i=0; i<listSize; i++){
        const reader = new FileReader();
        const file:File = event.target.files[i];
        reader.onload = (e:any)=>{
          this.previewFile![i] = e.target.result;
        }
        reader.readAsDataURL(file);
      }

    }
  }

  onSave() {
    if(this.saveForm.invalid){
      console.error('One or more form controls are null.');
      return;
    }
    const pictureList = this.files;

    const formData = new FormData;
    formData.append('name',this.saveForm.get('name')?.value);
    formData.append('city',this.saveForm.get('city')?.value);
    formData.append('type',this.saveForm.get('type')?.value);
    formData.append('chargePerNight',this.saveForm.get('price')?.value);
    formData.append('rooms',this.saveForm.get('rooms')?.value);
    formData.append('userId',StorageService.getUserId());
    if(pictureList){
      for(let i=0; i<pictureList.length; i++){
        formData.append('pictureList',pictureList[i]);
      }
    }
    this.propertyService.saveProperty(formData).subscribe(
      resp=>{
        console.log(resp);
        this.saveForm.reset();
        this.isFileSelected =false;
        this.router.navigateByUrl("/listed-property")

      },
      error => {
        console.log("Something went wrong");
      });

  }
}
