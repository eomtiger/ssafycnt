package com.ssafy.ssafycnttradeservice.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
// ##StatCd##
@Entity
//@Table(schema = "##StatCd##_trading")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Graph {
    @EmbeddedId
    private PrimaryKey primaryKey;
}
