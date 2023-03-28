package com.ssafy.ssafycnttradeservice.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PrimaryKey implements Serializable {
    @Column(name="year")
    private String year;
    @Column(name="hscd")
    private String hscd;
    @Column(name="expwgt")
    private String expwgt;
    @Column(name="expdlr")
    private String expdlr;
    @Column(name="impwgt")
    private String impwgt;
    @Column(name="impdlr")
    private String impdlr;
    @Column(name="balpayments")
    private String balpayments;
}
