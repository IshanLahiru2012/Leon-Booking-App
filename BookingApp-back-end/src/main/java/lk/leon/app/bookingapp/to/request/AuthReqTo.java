package lk.leon.app.bookingapp.to.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthReqTo {

    private String email;
    private String password;


}
