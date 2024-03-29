package lk.leon.app.bookingapp.repository;

import lk.leon.app.bookingapp.entity.Book;
import lk.leon.app.bookingapp.to.BookPropertTo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {

    @Query("SELECT b FROM Book b WHERE b.property.id = :propertyId")
    Book getBookByPropertyId(@Param("propertyId") Integer id);


}
