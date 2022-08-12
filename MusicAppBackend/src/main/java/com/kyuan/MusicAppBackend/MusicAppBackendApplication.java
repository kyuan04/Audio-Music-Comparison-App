package com.kyuan.MusicAppBackend;

import com.kyuan.MusicAppBackend.model.Song;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.awt.print.Book;
import java.util.List;

@SpringBootApplication
@Configuration
@EnableCaching
public class MusicAppBackendApplication {

	public static void main(String[] args) {
		new SpringApplicationBuilder(MusicAppBackendApplication.class).headless(true).run(args);
		//SpringApplication.run(MusicAppBackendApplication.class, args);
	}

	@Bean
	public RedisTemplate<String, List<Song>> redisTemplate(RedisConnectionFactory connectionFactory) {
		RedisTemplate<String, List<Song>> template = new RedisTemplate<>();
		template.setConnectionFactory(connectionFactory);
		// Add some specific configuration here. Key serializers, etc.
		return template;
	}

}
