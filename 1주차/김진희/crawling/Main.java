package org.example;
import java.io.IOException;
import java.text.ParseException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class Main {
    public static void main(String[] args) throws ParseException {
        String search_word = "요소수";
        String start_date = "2022.02.01";
        String end_date = "2022.03.01";
        String[] start_idx = {"1", "11", "21", "31", "41", "51", "61", "71","81", "91"};
//        String URL = "https://search.naver.com/search.naver?where=news&query="+search_word+"&sm=tab_opt&sort=0&photo=0&field=0&pd=3&ds="+start_date+"&de="+end_date+"&docid=&related=0&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so%3Ar%2Cp%3Afrom20230101to20230201&is_sug_officeid=0";
        String URL = "https://search.naver.com/search.naver?where=news&sm=tab_pge&query="+search_word+"&sort=0&photo=0&field=0&pd=3&ds="+start_date+"&de="+end_date+"&cluster_rank=33&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:from20230101to20230201,a:all&start=";
        Document doc;
        for (int j=0;j<10;j++){
            try {
                doc = Jsoup.connect(URL+start_idx[j]).get();
                Elements news_press = doc.select(".info_group .press");  // 신문사
                Elements news_info = doc.select(".info_group >span");    // 시간
                Elements news_title = doc.select(".news_tit");           // 제목
                Elements news_content =doc.select(".dsc_wrap a");        // 내용
                int n = 0;
                for(int i=0;i<news_press.size();i++){
                    System.out.println(news_press.get(i).text());

                    if(news_info.get(i+n).text().length() < 11){
                        n++;
                    }
                    System.out.println(news_info.get(i+n).text());
                    System.out.println(news_title.get(i).text());
                    System.out.println(news_content.get(i).text());
                    System.out.println(news_title.get(i).attr("abs:href"));

                }

            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

    }
}