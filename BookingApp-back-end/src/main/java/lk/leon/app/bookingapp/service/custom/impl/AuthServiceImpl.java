package lk.leon.app.bookingapp.service.custom.impl;

import lk.leon.app.bookingapp.entity.User;
import lk.leon.app.bookingapp.repository.UserRepository;
import lk.leon.app.bookingapp.service.custom.AuthService;
import lk.leon.app.bookingapp.service.util.Transformer;
import lk.leon.app.bookingapp.to.UserTo;
import lk.leon.app.bookingapp.to.request.UserReqTo;
import lk.leon.app.bookingapp.util.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final Transformer transformer;
    @Override
    public UserTo registerUser(UserReqTo userReqTo) {
        User user = transformer.fromUserReqTo(userReqTo);
        user.setPassword(new BCryptPasswordEncoder().encode(userReqTo.getPassword()));
        User registeredUser = userRepository.save(user);
        UserTo userTo = transformer.toUserTo(registeredUser);
        System.out.println(userTo);
        return userTo;

    }
    @Override
    public boolean existUser(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @Override
    public void updateUser(UserReqTo userReqTo) {

    }
}
