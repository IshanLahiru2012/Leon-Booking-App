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
          <mat-form-field class="full-width">
            <mat-label>Price/day</mat-label>
            <input matInput type="number" formControlName="price" placeholder="0">
            <mat-error *ngIf="saveForm.get('price')?.hasError('required')">
              Property Price is <strong>required</strong>
            </mat-error>
          </mat-form-field>
              <input type="file" class="file-input"
                     [accept]="requiredFileType"
                     (change)="onFileSelected($event)" #fileUpload multiple formControlName="photo">

              <div class="file-upload">

                {{fileName || "No file uploaded yet."}}

                <button mat-mini-fab color="primary" class="upload-btn"
                        (click)="fileUpload.click()">
                  <mat-icon>attach_file</mat-icon>

                </button>

              </div>

              <div >

                <mat-icon class="cancel-upload" (click)="cancelUpload()"
                          *ngIf="uploadProgress">delete_forever</mat-icon>

              </div>
<!--          <mat-form-field class="full-width">-->
<!--            <mat-label>Property Photos</mat-label>-->
<!--            <input type="file" (change)="onFileSelected($event)" accept=".jpeg,.gif" formControlName="photo" multiple>-->
<!--            <mat-error *ngIf="saveForm.get('type')?.hasError('required')">-->
<!--              Property Price is <strong>required</strong>-->
<!--            </mat-error>-->
<!--          </mat-form-field>-->
        </form>

      </mat-card-content>
    </mat-card>

    <div *ngIf="onFileSelected">
      <img src="{{upFile}}">
    </div>





  `,
  styleUrl: './save-property.component.scss'
})
export class SavePropertyComponent implements OnInit{
  matcher = new MyErrorStateMatcher();
  saveForm! : FormGroup;
  foods = [
    {value: 'Hotel'},
    {value: 'Apartment'},
    {value:  'Resort'},
    {value:  'Villa'},
  ];

  constructor(private formBuilder:FormBuilder,
              private http:HttpClient,
              ) {
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

  // onFileSelected(event: any) {
  //   const files: FileList = event.target.files;
  //   // You can now handle the selected files
  //   console.log(files);
  // }
  fileName = '';
  @Input()
  requiredFileType! :string;
  uploadProgress! :number;
  upFile! : File;
  // uploadSub :Subscription



  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    this.upFile =file;


    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);

      const reader = new FileReader();
      reader.onload = (e:any)=>{
        this.upFile = e.target.result;
      }
      reader.readAsDataURL(file);

      const upload$ = this.http.post("/api/thumbnail-upload", formData, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          finalize(() => this.reset())
        );

      // this.uploadSub = upload$.subscribe(event => {
      //   if (event.type == HttpEventType.UploadProgress) {
      //     this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
      //   }
      // })
    }
    console.log(this.saveForm.value)
  }

  cancelUpload() {
    // this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
  }
}
