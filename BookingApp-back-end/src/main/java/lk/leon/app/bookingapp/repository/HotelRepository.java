package lk.leon.app.bookingapp.repository;

import lk.leon.app.bookingapp.entity.Hotel;
import lk.leon.app.bookingapp.util.HotelType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {


    List<Hotel> findHotelByType(HotelType type);
    @Query("SELECT h FROM Hotel h WHERE h.type = lk.leon.app.bookingapp.util.HotelType.APARTMENT")
    List<Hotel> findApartmentHotels();
    @Query("SELECT h FROM Hotel h WHERE h.type = lk.leon.app.bookingapp.util.HotelType.RESORT")
    List<Hotel> findResortHotel();
    @Query("SELECT h FROM Hotel h WHERE h.type = lk.leon.app.bookingapp.util.HotelType.VILLA")
    List<Hotel> findVillaHotel();
}
