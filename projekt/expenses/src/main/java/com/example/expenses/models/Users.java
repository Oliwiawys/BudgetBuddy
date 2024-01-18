package com.example.expenses.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Users")
@Table
public class Users {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    @Column(
            name = "user_id",
            updatable = false
    )
    private int userID;
    @Column(
            name = "username",
            nullable = false
    )
    private String username;
    @Column(
            name = "email",
            nullable = false
    )
    private String email;
    @Column(
            name = "password",
            nullable = false
    )
    private String password;

    @Column(
            name = "role",
            nullable = false
    )
    private String role;
    @Column(
            name = "create_date"
    )
    @Temporal(TemporalType.DATE)
    private Date createDate;

    public Users(String username, String email, String password, String role, Date createDate) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createDate = createDate;
    }
}
