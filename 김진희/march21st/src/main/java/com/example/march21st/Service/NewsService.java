package com.example.march21st.Service;

import com.example.march21st.dto.NewsDto;
import java.util.List;

public interface NewsService {
//    Map<String, Object> getNewsData();
    List<NewsDto> getNewsData();
}
