package com.ssafy.ssafycntnewsservice.dto;

import lombok.Data;

@Data
public class NewsDto {
    private String newsPress;
    private String newsDate;
    private String newsTitle;
    private String newsContent;
    private String newsLink;
}
