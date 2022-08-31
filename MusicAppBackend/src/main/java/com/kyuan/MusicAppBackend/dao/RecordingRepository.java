package com.kyuan.MusicAppBackend.dao;


import com.kyuan.MusicAppBackend.entity.RecordingEntity;
import com.kyuan.MusicAppBackend.entity.SongEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface RecordingRepository extends JpaRepository<RecordingEntity, String>, JpaSpecificationExecutor<RecordingEntity> {

}
