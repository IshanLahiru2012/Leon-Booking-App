package lk.leon.app.bookingapp.repository;

import lk.leon.app.bookingapp.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepository extends JpaRepository<Hotel, Integer> {
}
