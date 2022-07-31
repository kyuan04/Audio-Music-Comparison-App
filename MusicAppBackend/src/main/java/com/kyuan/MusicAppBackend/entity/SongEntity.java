package com.kyuan.MusicAppBackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "songs")
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
public class SongEntity {
    @Id
    @Column(name = "id", nullable = false, insertable = true, updatable = false, length = 8)
    private String id;

    @Column(name = "song_name", nullable = false, insertable = true, updatable = true, length = 256)
    private String songName;

    @Column(name = "song_data", nullable = false, insertable = true, updatable = true)
    private byte[] songData;

    @Column(name = "size", nullable = false, insertable = true, updatable = true, length = 256)
    private String size;

    @Column(name = "artist", nullable = false, insertable = true, updatable = true, length = 256)
    private String artist;

    @Column(name = "genre", nullable = false, insertable = true, updatable = true, length = 256)
    private String genre;

}
