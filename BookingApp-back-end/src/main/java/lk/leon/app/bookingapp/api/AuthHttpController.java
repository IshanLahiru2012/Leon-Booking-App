package lk.leon.app.bookingapp.api;

import lk.leon.app.bookingapp.entity.User;
import lk.leon.app.bookingapp.repository.UserRepository;
import lk.leon.app.bookingapp.service.custom.AuthService;
import lk.leon.app.bookingapp.service.custom.UserService;
import lk.leon.app.bookingapp.to.AuthRespTo;
import lk.leon.app.bookingapp.to.UserTo;
import lk.leon.app.bookingapp.to.request.AuthReqTo;
import lk.leon.app.bookingapp.to.request.UserReqTo;
import lk.leon.app.bookingapp.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/v1/auths")
@CrossOrigin
@RequiredArgsConstructor
public class AuthHttpController {


    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> registerNewUser(@RequestBody @Validated UserReqTo userReqTo){
        if(authService.existUser(userReqTo.getEmail()))
            return new ResponseEntity<>("User already Exist with "+userReqTo.getEmail()+", try agin using another email...!",HttpStatus.NOT_ACCEPTABLE);;
        UserTo registeredUser = authService.registerUser(userReqTo);
        if(registeredUser == null)
            return new ResponseEntity<>("User not created, try agin...!",HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(registeredUser,HttpStatus.CREATED);

    }
    @PostMapping("/login")
    public AuthRespTo authenticationResponse(@RequestBody AuthReqTo authenticationRequest)
            throws BadCredentialsException, DisabledException, UsernameNotFoundException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(),authenticationRequest.getPassword()));
        }catch (BadCredentialsException e){
            throw new BadCredentialsException("Invalid Username or Password");
        }
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final  String jwt = jwtUtil.generateToken(userDetails);
        AuthRespTo authRespTo = new AuthRespTo();
        if(optionalUser.isPresent()){
            authRespTo.setJwt(jwt);
            authRespTo.setUserId(optionalUser.get().getId());
            authRespTo.setUserRole(optionalUser.get().getUserRole());
        }
        return authRespTo;

    }

}
