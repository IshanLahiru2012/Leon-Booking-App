package lk.leon.app.bookingapp.entity;

import lk.leon.app.bookingapp.util.PropertyType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Positive;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "property")
public class Property implements SuperEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 100, nullable = false)
    private String name;
    @Column(length = 100, nullable = false)
    private String city;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "ENUM('HOTEL','APARTMENT','RESORT','VILLA')")
    private PropertyType type;
    @Column(name = "charge_per_night", nullable = false)
    @Positive
    private int chargePerNight;
    @Column(nullable = false)
    @Positive
    private int rooms;

    @ToString.Exclude
    @OneToMany(mappedBy = "property", cascade = CascadeType.REMOVE)
    private List<Picture> pictureList;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id" , nullable = false)
    private User user;

    @ToString.Exclude
    @OneToMany(mappedBy = "property", cascade = CascadeType.REMOVE)
    private List<Book> bookingList;

    public Property(String name, String city, PropertyType type, int chargePerNight) {
        this.name = name;
        this.city = city;
        this.type = type;
        this.chargePerNight = chargePerNight;
    }
}
