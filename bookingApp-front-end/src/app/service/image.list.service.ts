import {Injectable} from "@angular/core";
import {PropertyDto} from "../dto/property.dto";

@Injectable({
  providedIn: 'root'
})
export class ImageListService{
  private property!: PropertyDto;

  setProperty(property: PropertyDto){
    this.property = property;
  }
  getProperty(){
    return this.property;
  }


}
