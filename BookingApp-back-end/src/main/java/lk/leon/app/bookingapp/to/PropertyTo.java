package lk.leon.app.bookingapp.to;

import lk.leon.app.bookingapp.util.PropertyType;
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
public class PropertyTo {
    @Null(message = "Id should be empty")
    private int id;
    @NotBlank(message = "Name cannot be empty")
    @Pattern(regexp = "^[A-Za-z ]{2,}$", message = "Invalid name")
    private String name;
    @NotBlank(message = "City cannot be empty")
    @Length(min = 3, message = "Invalid city")
    private String city;
    @NotNull(message = "Type should be either 'resort', 'apartment', 'villa'  ")
    @Enumerated(EnumType.STRING)
    private PropertyType type;
    @Positive(message = "charges cannot be negative")
    private int chargePerNight;
    @Positive(message = "charges cannot be negative")
    private Integer userId;
    @Null(message = "Picture should be empty")
    private List<String> pictureList;



}
