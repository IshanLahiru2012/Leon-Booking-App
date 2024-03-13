package lk.leon.app.bookingapp.api;

import lk.leon.app.bookingapp.service.custom.BookService;
import lk.leon.app.bookingapp.to.BookTo;
import lk.leon.app.bookingapp.to.request.BookReqTo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/v1/bookings")
public class BookHttpController {

    private final BookService bookService;

    @PostMapping()
    public ResponseEntity<?> saveBooking(@Validated @RequestBody BookReqTo bookReqTo){
        BookTo book = bookService.saveBook(bookReqTo);
        if(book==null){
            return new ResponseEntity<>("booking is not created", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(book,HttpStatus.CREATED);
    }
}
