package lk.leon.app.bookingapp.to.request;

import lk.leon.app.bookingapp.util.PropertyType;
import lk.leon.app.bookingapp.validation.PropertyImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertyReqTo implements Serializable {
    private Integer id;
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
    @PropertyImage()
    private List<MultipartFile> pictureList;
}
