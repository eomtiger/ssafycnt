package com.ssafy.ssafycnttradeservice.service;

import com.ssafy.ssafycnttradeservice.jpa.TradeRepository;
import org.springframework.stereotype.Service;


@Service
public class TradeServiceImpl implements TradeService{
    TradeRepository tradeRepository;

    public TradeServiceImpl(TradeRepository tradeRepository) {
        this.tradeRepository = tradeRepository;
    }
}
