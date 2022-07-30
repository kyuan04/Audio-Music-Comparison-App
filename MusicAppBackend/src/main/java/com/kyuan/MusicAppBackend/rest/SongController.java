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
    public SongEntity uploadSong(@RequestParam("file") MultipartFile multipartFile) throws Exception {
        SongEntity song = new SongEntity();
        song.setId(generateId());
        song.setSongName(multipartFile.getOriginalFilename());
        song.setSongData(multipartFile.getBytes());
        song.setSize(String.valueOf(multipartFile.getSize()));

        return songRepo.save(song);
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
