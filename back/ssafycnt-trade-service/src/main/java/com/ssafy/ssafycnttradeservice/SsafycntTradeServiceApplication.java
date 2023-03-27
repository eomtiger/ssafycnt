package com.ssafy.ssafycnttradeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SsafycntTradeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsafycntTradeServiceApplication.class, args);
	}

}
