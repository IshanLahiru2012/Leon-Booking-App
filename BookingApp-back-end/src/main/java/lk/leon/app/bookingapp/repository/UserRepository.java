package lk.leon.app.bookingapp.repository;

import lk.leon.app.bookingapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Integer> {
}
