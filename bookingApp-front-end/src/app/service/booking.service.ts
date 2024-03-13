import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookDto} from "../dto/book.dto";
import {BookReqDto} from "../dto/book.req.dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly API_BASE_URL = 'http://localhost:8080/api/v1/bookings';
  constructor(private http:HttpClient) { }

  saveBookings(book:BookReqDto):Observable<BookDto>{
    return  this.http.post<BookDto>(`${this.API_BASE_URL}`,book);
  }
}
