import {Injectable} from "@angular/core";
import {PropertyDto} from "../dto/property.dto";

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private property!: PropertyDto;
  private isEditing:boolean = false;

  setProperty(property: PropertyDto){
    this.property = property;
  }
  getProperty(){
    return this.property;
  }
  getIsEditing(){
    return this.isEditing
  }
  setIsEditing(state: boolean){
    this.isEditing = state;
  }


}
