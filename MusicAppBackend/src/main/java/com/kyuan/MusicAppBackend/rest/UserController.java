package com.kyuan.MusicAppBackend.rest;

import java.util.List;
import java.util.Map;
import java.util.Random;

import com.kyuan.MusicAppBackend.dao.CustomQuerySpecificationBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.kyuan.MusicAppBackend.entity.UserEntity;
import com.kyuan.MusicAppBackend.dao.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/login")
public class UserController {
    @Autowired
    private UserRepository userRepo;

    /*@GetMapping()
    public List<UserEntity> listAll() {
        List<UserEntity> listUsers = userRepo.findAll();
        return listUsers;
    }*/

    @GetMapping("/users/{id}")
    public UserEntity getOne(@PathVariable("id") String id) {
        UserEntity existingEntity = userRepo.getReferenceById(id);
        return existingEntity;
    }

    @PostMapping("/users")
    @ResponseStatus(HttpStatus.CREATED)
    public UserEntity createUser(@RequestBody UserEntity entity) {
        if(entity.getId() == null){
            entity.setId(generateId());
        }
        UserEntity savedEntity = userRepo.save(entity);

        return savedEntity;
    }

    private String generateId() {
        Random rand = new Random();
        int id = rand.nextInt(99999999);
        return String.format("%08d", id);
    }


    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable("id") String id) {
        UserEntity existingEntity = userRepo.getReferenceById(id);
        userRepo.delete(existingEntity);
    }

    @GetMapping("/users")
    public List<UserEntity> queryBy(@RequestParam Map<String, String> allParams) {
        CustomQuerySpecificationBuilder builder = new CustomQuerySpecificationBuilder();
        for(Map.Entry<String, String> entry: allParams.entrySet()) {
            builder.with(entry.getKey(), entry.getValue());
        }
        Specification<UserEntity> spec = builder.build();
        List<UserEntity> listUsers = userRepo.findAll(spec);
        return listUsers;
    }

}
