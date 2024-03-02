package lk.leon.app.bookingapp.api;

import lk.leon.app.bookingapp.service.custom.AuthService;
import lk.leon.app.bookingapp.to.UserTo;
import lk.leon.app.bookingapp.to.request.UserReqTo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auths")
public class AuthHttpController {

    @Autowired
    private AuthService authService;


    @PostMapping("/signup")
    public ResponseEntity<?> registerNewUser(@RequestBody @Validated UserReqTo userReqTo){
        if(authService.existUser(userReqTo.getEmail()))return
                new ResponseEntity<>("User already Exist with "+userReqTo.getEmail()+", try agin using another email...!",HttpStatus.NOT_ACCEPTABLE);;
        UserTo registeredUser = authService.registerUser(userReqTo);
        if(registeredUser == null) return
                new ResponseEntity<>("User not created, try agin...!",HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(registeredUser,HttpStatus.CREATED);

    }

}
