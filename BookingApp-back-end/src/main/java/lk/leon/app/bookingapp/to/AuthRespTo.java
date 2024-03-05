package lk.leon.app.bookingapp.to;

import lk.leon.app.bookingapp.util.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRespTo {

    private String jwt;
    private UserRole userRole;
    private int userId;
}
