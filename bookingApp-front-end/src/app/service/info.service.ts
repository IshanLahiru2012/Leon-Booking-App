import {Injectable} from "@angular/core";
import {PropertyDto} from "../dto/property.dto";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private property!: PropertyDto;
  private isEditing:boolean = false;
  private isBooking:boolean =false;
  private isBookingList =false;

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
  setIsBooking(state: boolean){
    this.isBooking = state;
  }
  getIsBooking(){
    return this.isBooking;
  }
  setIsBookingList(state:boolean){
    this.isBookingList = state;
  }
  getIsBookingList(){
    return this.isBookingList;
  }


}
