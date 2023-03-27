package com.ssafy.ssafycnttradeservice.dto;

import lombok.Data;

import javax.persistence.*;

@Data
public class TradeDto {

    private String hsCd;
    private Long impDlr;
    private Long impWgt;
    private Long expDlr;
    private Long expWgt;
    private Long balPayments;
    private String statCd;

}
