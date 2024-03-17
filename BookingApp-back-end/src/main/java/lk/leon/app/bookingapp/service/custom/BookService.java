package lk.leon.app.bookingapp.service.custom;

import lk.leon.app.bookingapp.entity.Property;
import lk.leon.app.bookingapp.service.SuperService;
import lk.leon.app.bookingapp.to.BookTo;
import lk.leon.app.bookingapp.to.PropertyTo;
import lk.leon.app.bookingapp.to.request.BookReqTo;

import java.util.List;

public interface BookService extends SuperService {

    BookTo saveBook(BookReqTo bookReqTo);
    BookTo getBook(Integer id);
    void deleteBooking(Integer id);

}
