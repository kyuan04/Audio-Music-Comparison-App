package com.kyuan.MusicAppBackend.dao;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")
public class UserEntity {
    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = false, length = 8)
    private String id;

    @Column(name = "email", nullable = false, insertable = true, updatable = true, length = 256)
    private String email;

    private String name;
}
