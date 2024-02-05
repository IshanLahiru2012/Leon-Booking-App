package lk.leon.app.bookingapp.to.request;

import lk.leon.app.bookingapp.entity.Picture;
import lk.leon.app.bookingapp.util.HotelType;
import lk.leon.app.bookingapp.validation.HotelImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotelReqTo implements Serializable {
    @NotBlank(message = "Name cannot be empty")
    @Pattern(regexp = "^[A-Za-z ]{2,}$", message = "Invalid name")
    private String name;
    @NotBlank(message = "City cannot be empty")
    @Length(min = 3, message = "Invalid city")
    private String city;
    @NotNull(message = "Type should be either 'resort', 'apartment', 'villa'  ")
    private HotelType type;
    @NotBlank(message = "ChargePerNight cannot be empty")
    @Positive
    private int ChargePerNight;
    @HotelImage
    private List<Picture> pictureList;
}
