package com.example.march21st.Service;

import com.example.march21st.dto.NewsDto;

import java.util.List;
import java.util.Map;

public interface MiningService {
    Map<String, Integer> getMiningData(List<NewsDto> newsdata);
}
