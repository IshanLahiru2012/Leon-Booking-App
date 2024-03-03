package lk.leon.app.bookingapp.to;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserTo {
    private int id;
    @NotBlank(message = "name cannot be empty")
    private String name;
    @NotBlank(message = "username cannot be empty")
    @Length(min = 3,message = "Invalid Username")
    private String email;
}
