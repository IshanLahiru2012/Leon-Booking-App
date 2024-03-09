package lk.leon.app.bookingapp.service.custom;

import lk.leon.app.bookingapp.entity.User;
import lk.leon.app.bookingapp.to.request.UserReqTo;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService {

    UserDetailsService userDetailsService();
    User getUserById(Integer id);
}
