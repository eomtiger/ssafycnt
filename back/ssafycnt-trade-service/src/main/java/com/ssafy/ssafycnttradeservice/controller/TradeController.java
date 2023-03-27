package com.ssafy.ssafycnttradeservice.controller;

import com.ssafy.ssafycnttradeservice.service.TradeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Size;

@RestController
@Slf4j
@RequestMapping("/")
public class TradeController {
    private Environment env;

    private TradeService tradeService;

    public TradeController(Environment env, TradeService tradeService) {
        this.env = env;
        this.tradeService = tradeService;
    }

    @GetMapping("/health_check")
    public String status(){
        return String.format("It's working in Trade Service on PORT %s",
                env.getProperty("local.server.port"));
    }
}
