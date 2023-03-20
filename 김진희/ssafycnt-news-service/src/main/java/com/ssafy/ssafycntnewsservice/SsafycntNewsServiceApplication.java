package com.ssafy.ssafycntnewsservice;

import com.ssafy.ssafycntnewsservice.configuration.NewsJobConfiguration;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.SimpleJob;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

@EnableBatchProcessing
@SpringBootApplication
public class SsafycntNewsServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsafycntNewsServiceApplication.class, args);

		AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(NewsJobConfiguration.class);
		Job simpleJob = applicationContext.getBean("Job", Job.class);
	}

}
