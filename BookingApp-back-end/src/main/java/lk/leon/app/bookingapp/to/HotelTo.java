package lk.leon.app.bookingapp.to;

import lk.leon.app.bookingapp.entity.Picture;
import lk.leon.app.bookingapp.util.HotelType;
import lk.leon.app.bookingapp.validation.HotelImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelTo {
    @Null(message = "Id should be empty")
    private int id;
    @Column(length = 100, nullable = false)
    private String name;
    @Column(length = 100, nullable = false)
    private String city;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "ENUM('APARTMENT','RESORT','VILLA')")
    private HotelType type;
    @Column(name = "charge_per_night", nullable = false)
    @Positive(message = "charges cannot be negative")
    private int ChargePerNight;
    @Null(message = "Picture should be empty")
    private List<String> pictureList;


}
