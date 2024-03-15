package lk.leon.app.bookingapp.repository;

import lk.leon.app.bookingapp.entity.Property;
import lk.leon.app.bookingapp.util.PropertyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Integer> {


    List<Property> findPropertyByType(PropertyType type);
    @Query("SELECT p FROM Property p WHERE p.user.id= :userId")
    List<Property> findPropertyByUserId(@Param("userId") Integer id);
    @Query("SELECT p FROM Property p WHERE p.type = lk.leon.app.bookingapp.util.PropertyType.APARTMENT")
    List<Property> findApartmentProperties();
    @Query("SELECT p FROM Property p WHERE p.type = lk.leon.app.bookingapp.util.PropertyType.RESORT")
    List<Property> findResortProperties();
    @Query("SELECT p FROM Property p WHERE p.type = lk.leon.app.bookingapp.util.PropertyType.VILLA")
    List<Property> findVillaProperties();
}
