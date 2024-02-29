package lk.leon.app.bookingapp.service.custom.impl;

import lk.leon.app.bookingapp.repository.UserRepository;
import lk.leon.app.bookingapp.service.custom.UserService;
import lk.leon.app.bookingapp.to.UserTo;
import lk.leon.app.bookingapp.to.request.UserReqTo;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserTo registerUser(UserReqTo userReqTo) {
        return null;
    }

    @Override
    public void updateUser(UserReqTo userReqTo) {

    }
}
