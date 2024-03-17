package lk.leon.app.bookingapp.to;

import lk.leon.app.bookingapp.entity.Property;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookPropertTo {
    @NotNull(message = "startDate cannot be empty")
    private Date startDate;
    @NotNull(message = "startDate cannot be empty")
    private Date endDate;
    @NotNull(message = "rooms cannot be empty")
    @Positive(message = "rooms should be positive")
    private int rooms;


}
