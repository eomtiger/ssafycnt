package com.ssafy.ssafycnttradeservice.controller;

import com.ssafy.ssafycnttradeservice.domain.Graph;
import com.ssafy.ssafycnttradeservice.dto.ByCountryRequestDTO;
import com.ssafy.ssafycnttradeservice.repository.GraphRepository;
import com.ssafy.ssafycnttradeservice.thread.ThreadLocalStorage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class GraphController {
//    private final GraphRepository graphRepository;
    @PersistenceContext
    private EntityManager em;

    @PostMapping("/trade/country")
    public ResponseEntity<?> searchDataByCountry(@RequestBody ByCountryRequestDTO dto) {
//        ThreadLocalStorage.setStatCd(dto.getStatCd());
//        List<Graph> resultDtos = graphRepository.findByPeriod(dto.getStartDate(), dto.getEndDate());
          String tableName = dto.getStatCd()+"_trading";
          String sql = "select * from " + tableName + " where year between"
//        return ResponseEntity.ok(resultDtos);
    }
}
