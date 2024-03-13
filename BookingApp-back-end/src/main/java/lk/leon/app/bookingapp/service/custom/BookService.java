package lk.leon.app.bookingapp.service.custom;

import lk.leon.app.bookingapp.service.SuperService;
import lk.leon.app.bookingapp.to.BookTo;
import lk.leon.app.bookingapp.to.request.BookReqTo;

public interface BookService extends SuperService {

    BookTo saveBook(BookReqTo bookReqTo);
}
