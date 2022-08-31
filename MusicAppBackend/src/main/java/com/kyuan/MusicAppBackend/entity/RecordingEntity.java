package com.kyuan.MusicAppBackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "recordings")
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class RecordingEntity {
    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = false, length = 8)
    private String id;

    @Column(name = "user_id", nullable = false, insertable = true, updatable = false, length = 8)
    private String userId;

    @Column(name = "song_id", nullable = false, insertable = true, updatable = false, length = 8)
    private String songId;

    @Column(name = "recording_data", nullable = false, insertable = true, updatable = true)
    private byte[] recordingData;

    @Column(name = "recording_name", nullable = false, insertable = true, updatable = true, length = 256)
    private String recordingName;
}
