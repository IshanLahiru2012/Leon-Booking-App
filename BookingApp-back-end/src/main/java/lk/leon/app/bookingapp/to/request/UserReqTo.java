package lk.leon.app.bookingapp.to.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserReqTo implements Serializable {
    private int id;
    @NotBlank(message = "username cannot be empty")
    @Length(min = 3,message = "Invalid Username")
    private String userName;
    @NotBlank(message = "password cannot be empty")
    @Length(min = 4,message = "Invalid password")
    private String password;
}
