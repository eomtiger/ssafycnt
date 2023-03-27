package com.ssafy.ssafycnttradeservice.thread;

public class ThreadLocalStorage {
    private static final ThreadLocal<String> threadLocal = new ThreadLocal<>();

    public static void setStatCd(String statCd) {
        clear();
        threadLocal.set(statCd);
    }

    public static String getStatCd() {
        return threadLocal.get();
    }

    public static void clear() {
        threadLocal.remove();
    }
}
