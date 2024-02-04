package lk.leon.app.bookingapp.entity;

import lk.leon.app.bookingapp.util.HotelType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "accommodation")
public class Hotel implements SuperEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 100, nullable = false)
    private String name;
    @Column(length = 100, nullable = false)
    private String city;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "ENUM('APARTMENT','RESORT','VILLA')")
    private HotelType type;
    @Column(name = "charge_per_night", nullable = false)
    private String ChargePerNight;


}
