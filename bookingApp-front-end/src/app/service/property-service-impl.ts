import {PropertyService} from "./property.service";
import {Injectable} from "@angular/core";
import {PropertyDto} from "../dto/property.dto";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, finalize, Observable, subscribeOn, tap} from "rxjs";
import {PropertyReqDto} from "../dto/propertyReq.dto";

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
    return  this.http.get<Array<PropertyDto>>(`${this.API_BASE_URL}?type=${type}`);

  }

  getPropertyByUserId(id:number):Observable<PropertyDto[]>{
    return  this.http.get<Array<PropertyDto>>(`${this.API_BASE_URL}/user?id=${id}`);

  }

  getPropertyByBookedUserId(id:number):Observable<PropertyDto[]>{
    return  this.http.get<Array<PropertyDto>>(`${this.API_BASE_URL}/booked-user?id=${id}`);

  }
  isInitialized(): boolean {
    return false;
  }

  saveProperty(propReqDto:FormData): Observable<PropertyDto> {
    return this.http.post<PropertyDto>(`${this.API_BASE_URL}`,propReqDto);
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_BASE_URL}/${id}`);
  }

  updateProperty(id:number,formData: FormData): Observable<PropertyDto> {
    return this.http.patch<PropertyDto>(`${this.API_BASE_URL}/${id}`,formData);
  }

  getPropertyByCity(city: string): Observable<PropertyDto[]> {
    return this.http.get<Array<PropertyDto>>(`${this.API_BASE_URL}/search?city=${city}`);
  }


}
