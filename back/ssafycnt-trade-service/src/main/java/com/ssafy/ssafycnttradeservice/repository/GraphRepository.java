package com.ssafy.ssafycnttradeservice.repository;

import com.ssafy.ssafycnttradeservice.domain.Graph;
import com.ssafy.ssafycnttradeservice.domain.PrimaryKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GraphRepository  {
//    @Query(value="select *" +
//            " from " + statCd
//            " WHERE g.primaryKey.year between :start AND :end"
//    )
//    public List<Graph> findByPeriod(String statCd, String start, String end);
}
