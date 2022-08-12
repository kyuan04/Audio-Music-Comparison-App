package com.kyuan.MusicAppBackend.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kyuan.MusicAppBackend.dao.SongRepository;
import com.kyuan.MusicAppBackend.dao.CustomQuerySpecificationBuilder;
import com.kyuan.MusicAppBackend.entity.SongEntity;
import com.kyuan.MusicAppBackend.model.Song;
import com.kyuan.MusicAppBackend.service.SongService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/content")
@Slf4j
public class SongController {
    @Autowired
    private RedisTemplate<String, List<Song>> redisTemplate;
    @Value("${media.content.web.rootdir}")
    String webRootDir;
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

        songEntity.setUrl(webRootDir + "audios/" + multipartFile.getOriginalFilename());
        songRepo.save(songEntity);

        Song song = Song.builder().
                id(songEntity.getId()).
                songName(songEntity.getSongName()).
                size(songEntity.getSize()).
                artist(songEntity.getArtist()).
                genre(songEntity.getGenre()).
                url(songEntity.getUrl()).
                build();
        redisTemplate.delete("SONG-LIST");
        return song;
    }



    private String generateId() {
        Random rand = new Random();
        int id = rand.nextInt(99999999);
        return String.format("%08d", id);
    }

    @DeleteMapping("/songs/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSong(@PathVariable("id") String id) {
        SongEntity existingEntity = songRepo.getReferenceById(id);
        songRepo.delete(existingEntity);
    }

    @GetMapping("/songs")
    public List<Song> queryBy(@RequestParam Map<String, String> allParams) {
        if(redisTemplate.opsForValue().get("SONG-LIST")!= null ){
            return redisTemplate.opsForValue().get("SONG-LIST");
            //String songListString = redisTemplate.opsForValue().get("SONG-LIST");
            //return new ObjectMapper().readValue(songListString, ArrayList<Song>.class);
        }

        List<Song> songs = songService.queryBy(allParams);
        redisTemplate.opsForValue().set("SONG-LIST", songs);
        /*try {
            redisTemplate.opsForValue().set("SONG-LIST", new ObjectMapper().writeValueAsString(songs));
        } catch (Exception e){
            //ignore
        }*/
        return songs;
    }

    @GetMapping(value="/songs/{id}", produces="application/octet-stream")
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody byte[] downloadSong(@PathVariable("id") String id) {
        return songService.downloadSong(id);
    }

}
