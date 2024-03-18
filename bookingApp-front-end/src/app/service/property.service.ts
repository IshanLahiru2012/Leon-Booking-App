import { Injectable } from '@angular/core';
import {PropertyDto} from "../dto/property.dto";
import {Observable} from "rxjs";
import {PropertyReqDto} from "../dto/propertyReq.dto";

export abstract class PropertyService {
  abstract isInitialized(): boolean;

  abstract getAllProperty(): Observable<PropertyDto[]>;
  abstract saveProperty(propReqDto:FormData):Observable<PropertyDto>;
  abstract getPropertyByType(type:string):Observable<PropertyDto[]>;
  abstract getPropertyByUserId(id:number):Observable<PropertyDto[]>;
  abstract deleteProperty(id:number):Observable<any>;
  abstract updateProperty(id:number,formData:FormData):Observable<PropertyDto>;
  abstract getPropertyByBookedUserId(id:number):Observable<PropertyDto[]>;
  abstract getPropertyByCity(city:string):Observable<PropertyDto[]>;
}
