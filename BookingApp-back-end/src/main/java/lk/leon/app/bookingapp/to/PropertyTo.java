package lk.leon.app.bookingapp.to;

import lk.leon.app.bookingapp.util.PropertyType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyTo {
    @Null(message = "Id should be empty")
    private int id;
    @Column(length = 100, nullable = false)
    private String name;
    @Column(length = 100, nullable = false)
    private String city;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "ENUM('APARTMENT','RESORT','VILLA')")
    private PropertyType type;
    @Column(name = "charge_per_night", nullable = false)
    @Positive(message = "charges cannot be negative")
    private int chargePerNight;
    @Null(message = "Picture should be empty")
    private List<String> pictureList;


}
