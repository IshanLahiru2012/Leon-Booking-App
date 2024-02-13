import { Injectable } from '@angular/core';
import {PropertyDto} from "../dto/property.dto";

export abstract class PropertyService {
  abstract isInitialized(): boolean;

  abstract getAllProperty(): Array<PropertyDto>;
}
