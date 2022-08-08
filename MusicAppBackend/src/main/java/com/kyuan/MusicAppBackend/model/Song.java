package com.kyuan.MusicAppBackend.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Data
@Builder
public class Song implements Serializable{
    private String id;
    private String songName;
    private String size;
    private String artist;
    private String genre;
    private String url;

}
