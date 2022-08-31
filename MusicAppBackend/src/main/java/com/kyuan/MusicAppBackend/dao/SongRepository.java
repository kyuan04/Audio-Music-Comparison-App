package com.kyuan.MusicAppBackend.dao;

import com.kyuan.MusicAppBackend.entity.SongEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SongRepository extends JpaRepository<SongEntity, String>, JpaSpecificationExecutor<SongEntity> {

    //@Query("SELECT ue FROM UserEntity ue WHERE ue.zipCode = ?1")
    //public List<SongEntity> queryBy(String queryString);
}
