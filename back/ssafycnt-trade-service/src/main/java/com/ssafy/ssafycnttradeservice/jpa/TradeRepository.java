package com.ssafy.ssafycnttradeservice.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TradeRepository extends JpaRepository<TradeEntity, Long> {

    TradeEntity findByHsCd(String hsCd);

    TradeEntity findByStatCd(String statCd);
}
