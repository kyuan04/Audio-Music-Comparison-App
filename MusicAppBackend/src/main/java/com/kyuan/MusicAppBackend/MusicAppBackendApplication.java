package com.kyuan.MusicAppBackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@ComponentScan(basePackages = ("com.kyuan.MusicAppBackend"))
@Configuration
public class MusicAppBackendApplication {

	public static void main(String[] args) {
		new SpringApplicationBuilder(MusicAppBackendApplication.class).headless(true).run(args);
		//SpringApplication.run(MusicAppBackendApplication.class, args);
	}

}
