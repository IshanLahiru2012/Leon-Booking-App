import {PropertyService} from "./property.service";
import {Injectable} from "@angular/core";
import {PropertyDto} from "../dto/property.dto";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, finalize, Observable, tap} from "rxjs";

@Injectable()
export class PropertyServiceImpl implements PropertyService{

  private readonly API_BASE_URL = 'http://localhost:8080/api/v1/properties'
  private propertyList$: BehaviorSubject<PropertyDto[]> = new BehaviorSubject<PropertyDto[]>([])
  private initialized = false;

  constructor(private http: HttpClient) {
  }
  getAllProperty(): Observable<PropertyDto[]>{
    if(!this.initialized){
      return this.fetchPropertyList().pipe(tap(propertList=> this.propertyList$.next(propertList)));
    }
    return this.propertyList$.asObservable();
  }
  private fetchPropertyList(): Observable<PropertyDto[]> {
    return this.http.get<Array<PropertyDto>>(this.API_BASE_URL).pipe(
      finalize(() => this.initialized = true)
    );
  }
  getPropertyByType(type:string):Observable<PropertyDto[]>{
    return  this.http.get<Array<PropertyDto>>(`${this.API_BASE_URL}?type=${type}`)
      .pipe(finalize(()=> this.initialized =true))

  }

  isInitialized(): boolean {
    return false;
  }

}
