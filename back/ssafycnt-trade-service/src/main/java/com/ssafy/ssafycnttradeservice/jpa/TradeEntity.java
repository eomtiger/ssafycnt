package com.ssafy.ssafycnttradeservice.jpa;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "trades")
public class TradeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String hsCd;

    @Column(nullable = true, length = 30, unique = false)
    private Long impDlr;

    @Column(length = 30)
    private Long impWgt;

    @Column(length = 30)
    private Long expDlr;

    @Column(length = 30)
    private Long expWgt;

    @Column(nullable = false, length = 50)
    private Long balPayments;

    @Column(nullable = false, length = 20, unique = true)
    private String statCd;
}
