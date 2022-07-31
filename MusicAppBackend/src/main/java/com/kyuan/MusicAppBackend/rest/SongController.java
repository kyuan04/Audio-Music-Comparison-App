package com.kyuan.MusicAppBackend.rest;

import com.kyuan.MusicAppBackend.dao.SongRepository;
import com.kyuan.MusicAppBackend.dao.CustomQuerySpecificationBuilder;
import com.kyuan.MusicAppBackend.entity.SongEntity;
import com.kyuan.MusicAppBackend.model.Song;
import com.kyuan.MusicAppBackend.service.SongService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/v1/login")
@Slf4j
public class SongController {
    @Autowired
    private SongService songService;
    @Autowired
    private SongRepository songRepo;

    @PostMapping("/songs")
    @ResponseStatus(HttpStatus.CREATED)
    public Song uploadSong(@RequestParam("file") MultipartFile multipartFile,
                                 @RequestParam("artist") String artist,
                                 @RequestParam("genre") String genre) throws Exception {
        SongEntity songEntity = new SongEntity();
        songEntity.setId(generateId());
        songEntity.setSongName(multipartFile.getOriginalFilename());
        songEntity.setSongData(multipartFile.getBytes());
        songEntity.setSize(String.valueOf(multipartFile.getSize()));
        songEntity.setArtist(artist);
        songEntity.setGenre(genre);
        songRepo.save(songEntity);

        Song song = Song.builder().
                id(songEntity.getId()).
                songName(songEntity.getSongName()).
                size(songEntity.getSize()).
                artist(songEntity.getArtist()).
                genre(songEntity.getGenre()).
                build();

        return song;
    }
    private String generateId() {
        Random rand = new Random();
        int id = rand.nextInt(99999999);
        return String.format("%08d", id);
    }

    @DeleteMapping("/songs/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable("id") String id) {
        SongEntity existingEntity = songRepo.getReferenceById(id);
        songRepo.delete(existingEntity);
    }

    @GetMapping("/songs")
    public List<Song> queryBy(@RequestParam Map<String, String> allParams) {
        return songService.queryBy(allParams);
    }
}
