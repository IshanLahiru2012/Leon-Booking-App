package lk.leon.app.bookingapp.to.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthReqTo implements Serializable {

    private String email;
    private String password;


}
