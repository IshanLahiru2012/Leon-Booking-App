package lk.leon.app.bookingapp.to;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.io.Serializable;
import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookTo implements Serializable {
    private int BookingId;
    @NotNull(message = "user id cannot be empty")
    @Positive(message = "user id cannot be negative")
    private int userId;
    @NotNull(message = "property id cannot be empty")
    @Positive(message = "property id cannot be negative")
    private int propertyId;
    @NotNull(message = "rooms cannot be empty")
    @Positive(message = "rooms should be positive")
    private int rooms;
    @NotNull(message = "startDate cannot be empty")
    private Date startDate;
    @NotNull(message = "startDate cannot be empty")
    private Date endDate;
}
