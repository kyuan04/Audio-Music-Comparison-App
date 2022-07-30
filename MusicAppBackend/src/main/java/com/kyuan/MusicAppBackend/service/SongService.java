package com.kyuan.MusicAppBackend.service;

import com.kyuan.MusicAppBackend.dao.CustomQuerySpecificationBuilder;
import com.kyuan.MusicAppBackend.dao.SongRepository;
import com.kyuan.MusicAppBackend.entity.SongEntity;
import com.kyuan.MusicAppBackend.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class SongService {
    @Autowired
    private SongRepository songRepo;

    @Transactional
    public List<Song> queryBy(Map<String, String> allParams) {
        CustomQuerySpecificationBuilder builder = new CustomQuerySpecificationBuilder();
        for(Map.Entry<String, String> entry: allParams.entrySet()) {
            builder.with(entry.getKey(), entry.getValue());
        }
        Specification<SongEntity> spec = builder.build();
        List<SongEntity> listSongs = songRepo.findAll(spec);
        List<Song> songs = new ArrayList<>();
        if(listSongs != null && listSongs.size() >0){
            for(SongEntity entity : listSongs){
                Song song = Song.builder()
                        .id(entity.getId())
                        .songName(entity.getSongName())
                        .size(entity.getSize())
                        .build();
                songs.add(song);
            }
        }
        return songs;
    }
}
