package com.kyuan.MusicAppBackend.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Builder
public class Song {
    private String id;
    private String songName;
    private String size;

}
