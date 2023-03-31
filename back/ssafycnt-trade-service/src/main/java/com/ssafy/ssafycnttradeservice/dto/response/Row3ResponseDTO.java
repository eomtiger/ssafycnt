package com.ssafy.ssafycnttradeservice.dto.response;

import com.ssafy.ssafycnttradeservice.constants.CdConstants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Row3ResponseDTO {
    private String period;
    private Map<String, Object> exportDetail;
    private Map<String, Object> importDetail;

    public Row3ResponseDTO(List<Map<String, Object>> list, String startDate, String endDate) {
        this.period = startDate + " ~ " + endDate;
        exportDetail = list.get(0);
        importDetail = list.get(1);
    }
}