package com.ssafy.ssafycnttradeservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.ssafycnttradeservice.domain.Graph;
import com.ssafy.ssafycnttradeservice.dto.request.Row1RequestDTO;
import com.ssafy.ssafycnttradeservice.dto.response.Row1ResponseDTO;
import com.ssafy.ssafycnttradeservice.service.GraphService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api")
public class GraphController {
    private final GraphService graphService;

    @PostMapping("/trade/country")
    public ResponseEntity<?> searchDataByCountry(@RequestBody Row1RequestDTO dto) throws JsonProcessingException {
        List<Graph> list = graphService.findDataByCountry(dto.getStatCd(),dto.getStartDate(),dto.getEndDate());
        return ResponseEntity.ok(new Row1ResponseDTO(list,dto.getStatCd(),dto.getStartDate(),dto.getEndDate()));
    }
}
