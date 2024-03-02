package lk.leon.app.bookingapp.service.custom.impl;

import lk.leon.app.bookingapp.entity.User;
import lk.leon.app.bookingapp.repository.UserRepository;
import lk.leon.app.bookingapp.service.custom.AuthService;
import lk.leon.app.bookingapp.to.UserTo;
import lk.leon.app.bookingapp.to.request.UserReqTo;
import lk.leon.app.bookingapp.util.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    @Override
    public UserTo registerUser(UserReqTo userReqTo) {
        User user = new User();
        user.setName(userReqTo.getName());
        user.setEmail(userReqTo.getEmail());
        user.setPassword(userReqTo.getPassword());
        user.setUserRole(UserRole.CUSTOMER);
        User registeredUser = userRepository.save(user);
        UserTo userTo = new UserTo();
        userTo.setId(registeredUser.getId());
        userTo.setName(registeredUser.getName());
        userTo.setEmail(registeredUser.getEmail());
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
