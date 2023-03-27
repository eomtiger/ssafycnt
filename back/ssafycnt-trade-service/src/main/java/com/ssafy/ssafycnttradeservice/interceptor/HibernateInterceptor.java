package com.ssafy.ssafycnttradeservice.interceptor;

import com.ssafy.ssafycnttradeservice.thread.ThreadLocalStorage;
import org.hibernate.EmptyInterceptor;
import org.hibernate.Interceptor;
import org.hibernate.Session;

import java.io.IOException;

public class HibernateInterceptor extends EmptyInterceptor {
    @Override
    public String onPrepareStatement(String sql) {
        String statCd = ThreadLocalStorage.getStatCd();
        sql = sql.replaceAll("##StatCd##",statCd);
        return super.onPrepareStatement(sql);
    }

}
