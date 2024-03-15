import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookDto} from "../dto/book.dto";
import {BookReqDto} from "../dto/book.req.dto";
import {finalize, Observable} from "rxjs";
import {PropertyDto} from "../dto/property.dto";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly API_BASE_URL = 'http://localhost:8080/api/v1/bookings';
  constructor(private http:HttpClient) { }

  saveBookings(book:BookReqDto):Observable<BookDto>{
    return  this.http.post<BookDto>(`${this.API_BASE_URL}`,book);
  }
  getBookingByPropertyId(propertyId:number):Observable<BookDto>{
    return this.http.get<BookDto>(`${this.API_BASE_URL}/${propertyId}`)
  }
  deleteBooking(bookingId:number):Observable<any>{
    return this.http.delete(`${this.API_BASE_URL}/${bookingId}`)
  }
  getPropertyByBookedUserId(id:number):Observable<PropertyDto[]>{
    return  this.http.get<Array<PropertyDto>>(`${this.API_BASE_URL}/booked-user?id=${id}`);

  }
}
