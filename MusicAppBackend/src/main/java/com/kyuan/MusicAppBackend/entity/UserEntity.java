package com.kyuan.MusicAppBackend.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class UserEntity {

    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = false, length = 8)
    private String id;

    @Column(name = "email", nullable = false, insertable = true, updatable = true, length = 256)
    private String email;

    @Column(name = "first_name", nullable = false, insertable = true, updatable = true, length = 256)
    private String firstName;

    @Column(name = "last_name", nullable = false, insertable = true, updatable = true, length = 256)
    private String lastName;

    @Column(name = "zip_code", nullable = false, insertable = true, updatable = true, length = 5)
    private String zipCode;

    @Column(name = "password", nullable = false, insertable = true, updatable = true, length = 256)
    private String password;

    @Column(name = "username", nullable = false, insertable = true, updatable = true, length = 256)
    private String username;
}
