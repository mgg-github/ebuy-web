package com.taotao.web.httpclient;

import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by zm on 6/2/17.
 */
public class ExpiredConnectionCleaner extends Thread{

    @Autowired
    private PoolingHttpClientConnectionManager clientConnectionManager;

    private volatile boolean shutdown =false;
    public ExpiredConnectionCleaner() {
        this.start();
    }

    @Override
    public void run() {
        while (!shutdown){
            synchronized (this){
                try {
                    wait(5000);
                    clientConnectionManager.closeExpiredConnections();
                    System.out.println("清理过期连接了！！！");
                } catch (InterruptedException e) {

                }
            }
        }
    }
    public void shutdown(){
        synchronized (this){
            shutdown = true;
            notifyAll();
        }
    }
}
