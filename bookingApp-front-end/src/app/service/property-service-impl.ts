import {PropertyService} from "./property.service";
import {Injectable} from "@angular/core";
import {PropertyDto} from "../dto/property.dto";
import {HttpClient} from "@angular/common/http";
import {finalize, Observable} from "rxjs";

@Injectable()
export class PropertyServiceImpl implements PropertyService{

  private readonly API_BASE_URL = 'http://localhost:8080/api/v1/hotels'
  private propertyList: Array<PropertyDto> = [];
  private initialized = false;

  constructor(private http: HttpClient) {
    this.http.get<Array<PropertyDto>>(`${this.API_BASE_URL}`)
      .pipe(finalize(()=> this.initialized =true))
      .subscribe(propertyList => this.propertyList = propertyList);

  }
  getAllProperty(){
    return this.propertyList;
  }
  getPropertyByType(type:string):Array<PropertyDto>{
    this.http.get<Array<PropertyDto>>(`${this.API_BASE_URL}?type=${type}`)
      .pipe(finalize(()=> this.initialized =true))
      .subscribe(propertyList => this.propertyList = propertyList);
    console.log(type)
    return this.propertyList;
  }

  isInitialized(): boolean {
    return false;
  }

}
