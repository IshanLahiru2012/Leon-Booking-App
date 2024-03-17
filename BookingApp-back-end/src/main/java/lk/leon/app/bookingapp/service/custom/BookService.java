package lk.leon.app.bookingapp.service.custom;

import lk.leon.app.bookingapp.service.SuperService;
import lk.leon.app.bookingapp.to.BookPropertTo;
import lk.leon.app.bookingapp.to.BookTo;
import lk.leon.app.bookingapp.to.request.BookReqTo;

import java.util.List;

public interface BookService extends SuperService {

    BookTo saveBook(BookReqTo bookReqTo);
    BookTo getBook(Integer id);
    void deleteBooking(Integer id);
    BookTo getBookedByPropertyId(Integer id);


}
