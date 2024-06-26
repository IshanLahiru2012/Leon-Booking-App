package lk.leon.app.bookingapp.api;

import lk.leon.app.bookingapp.service.custom.BookService;
import lk.leon.app.bookingapp.to.BookPropertTo;
import lk.leon.app.bookingapp.to.BookTo;
import lk.leon.app.bookingapp.to.request.BookReqTo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/api/v1/bookings")
public class BookHttpController {

    private final BookService bookService;

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> saveBooking(@Validated @RequestBody BookReqTo bookReqTo){
        BookTo book = bookService.saveBook(bookReqTo);
        if(book==null){
            return new ResponseEntity<>("booking is not created", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(book,HttpStatus.CREATED);
    }

    @GetMapping(value = "/{booking_id}",produces = "application/json")
    public ResponseEntity<?> getBooking(@PathVariable("booking_id") Integer id){
        BookTo book = bookService.getBook(id);
        if(book==null){
            return new ResponseEntity<>("there is no associated book for id",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(book,HttpStatus.OK);
    }
    @DeleteMapping(value = "/{bookingId}")
    @PreAuthorize("hasAuthority(UserRole.ADMIN.name())")
    public ResponseEntity<?> deleteBooking(@PathVariable("bookingId") Integer id){
        bookService.deleteBooking(id);
        return new ResponseEntity<>("Booking deleted successfully",HttpStatus.NO_CONTENT);
    }

    @GetMapping(value ="/booked-user" )
    public ResponseEntity<?> getPropertyByBookedUserId(@RequestParam(required = false) Integer id){
        BookTo bookedByPropertyId = bookService.getBookedByPropertyId(id);
        return new ResponseEntity<>(bookedByPropertyId,HttpStatus.OK);
    }
}
