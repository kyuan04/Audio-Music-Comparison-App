package com.kyuan.MusicAppBackend.rest;

import com.kyuan.MusicAppBackend.dao.RecordingRepository;
import com.kyuan.MusicAppBackend.entity.RecordingEntity;
import com.kyuan.MusicAppBackend.entity.SongEntity;
import com.kyuan.MusicAppBackend.model.Recording;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.dynamic.scaffold.TypeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Random;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/content")
@Slf4j
public class RecordingController {
    @Autowired
    private RecordingRepository recordingRepo;

    //upload
    @PostMapping("/recordings")
    @ResponseStatus(HttpStatus.CREATED)
    public Recording uploadRecording(@RequestParam("file") MultipartFile multipartFile,
                                     @RequestParam("song_id") String songId,
                                     @RequestParam("user_id") String userId) throws IOException {
        RecordingEntity recordingEntity = new RecordingEntity();
        recordingEntity.setId(generateId());
        recordingEntity.setSongId(songId);
        recordingEntity.setUserId(userId);
        recordingEntity.setRecordingData(multipartFile.getBytes());
        recordingEntity.setRecordingName(multipartFile.getOriginalFilename());

        recordingRepo.save(recordingEntity);

        Recording recording = Recording.builder()
                .id(recordingEntity.getId())
                .recordingName(recordingEntity.getRecordingName())
                .songId(recordingEntity.getSongId())
                .userId(recordingEntity.getUserId())
                .build();

        return recording;

    }

    private String generateId() {
        Random rand = new Random();
        int id = rand.nextInt(99999999);
        return String.format("%08d", id);
    }
    //download
    //delete
    @DeleteMapping("/recordings/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRecording(@PathVariable("id") String id) {
        RecordingEntity existingEntity = recordingRepo.getReferenceById(id);
        recordingRepo.delete(existingEntity);
    }
}
