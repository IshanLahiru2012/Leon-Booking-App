package lk.leon.app.bookingapp.service.custom.impl;

import lk.leon.app.bookingapp.entity.Book;
import lk.leon.app.bookingapp.entity.Property;
import lk.leon.app.bookingapp.entity.User;
import lk.leon.app.bookingapp.repository.BookRepository;
import lk.leon.app.bookingapp.service.custom.BookService;
import lk.leon.app.bookingapp.service.custom.PropertyService;
import lk.leon.app.bookingapp.service.custom.UserService;
import lk.leon.app.bookingapp.service.util.Transformer;
import lk.leon.app.bookingapp.to.BookTo;
import lk.leon.app.bookingapp.to.PropertyTo;
import lk.leon.app.bookingapp.to.request.BookReqTo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final Transformer transformer;
    private final PropertyService propertyService;
    private final UserService userService;
    @Override
    public BookTo saveBook(BookReqTo bookReqTo) {
        Book book = transformer.fromBookReqTo(bookReqTo);
        PropertyTo propertyTo = propertyService.getPropertyDetails(bookReqTo.getPropertyId());
        Property property1 = transformer.fromPropertyTo(propertyTo);
        User user = userService.getUserById(bookReqTo.getUserId());
        book.setUser(user);
        book.setProperty(property1);
        Book booked = bookRepository.save(book);
        BookTo bookTo = transformer.toBookTo(booked);
        System.out.println(bookTo);
        return bookTo;
    }

    @Override
    public BookTo getBook(Integer id) {
        Book book = bookRepository.getById(id);
        BookTo bookTo = transformer.toBookTo(book);
        return bookTo;
    }

    @Override
    public void deleteBooking(Integer id) {
        bookRepository.findById(id).orElseThrow(() -> new RuntimeException("No property Associated with the id"));
        bookRepository.deleteById(id);
    }

    @Override
    public List<Property> getBookedPropertiesByUserId(Integer id) {
        List<Property> bookedPropertyByUserId = bookRepository.getBookedPropertyByUserId(id);
        System.out.println(bookedPropertyByUserId);
        System.out.println("awa");
        return bookedPropertyByUserId;

    }
}
