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
public class Recording implements Serializable {
    private String id;
    private String songId;
    private String userId;
    private String recordingName;
}
