import { Injectable } from '@angular/core';
import {PropertyDto} from "../dto/property.dto";
import {Observable} from "rxjs";

export abstract class PropertyService {
  abstract isInitialized(): boolean;

  abstract getAllProperty(): Observable<PropertyDto[]>;
  abstract getPropertyByType(type:string):Observable<PropertyDto[]>;
}
