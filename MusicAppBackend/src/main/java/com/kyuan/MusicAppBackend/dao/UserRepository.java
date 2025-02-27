package com.kyuan.MusicAppBackend.dao;

import com.kyuan.MusicAppBackend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, String>, JpaSpecificationExecutor<UserEntity> {

    @Query("SELECT ue FROM UserEntity ue WHERE ue.zipCode = ?1")
    public List<UserEntity> queryBy(String queryString);
}
