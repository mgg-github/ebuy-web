package com.taotao.web.service;

import org.apache.http.NameValuePair;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Map;
import java.util.Set;

/**
 * Created by zm on 6/2/17.
 */
@Service
public class ApiService implements BeanFactoryAware{

    @Autowired
    private RequestConfig requestConfig;

    private BeanFactory beanFactory;
    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory = beanFactory;
    }

    public String doGet(String url){
        CloseableHttpClient httpClient = getHttpClient();
        HttpGet httpGet = new HttpGet(url);
        httpGet.setConfig(requestConfig);
        CloseableHttpResponse httpResponse =null;
        try {
            httpResponse = httpClient.execute(httpGet);
            if(httpResponse.getStatusLine().getStatusCode()==200){
                return EntityUtils.toString(httpResponse.getEntity());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(httpResponse!=null){
                try {
                    httpResponse.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }

    public String doGet(String url, Map<String,String> param){
        try {
            URIBuilder uriBuilder = new URIBuilder(url);
            Set<Map.Entry<String, String>> entrySet = param.entrySet();
            for (Map.Entry<String,String > entry: entrySet) {
                uriBuilder.addParameter(entry.getKey(),entry.getValue());
            }
            String u = uriBuilder.build().toString();
            return doGet(u);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String doPost(String url,Map<String,String> params){
        ArrayList<NameValuePair> nameValuePairs = new ArrayList<>();
        Set<Map.Entry<String, String>> entrySet = params.entrySet();
        for (Map.Entry<String,String> entry:
             entrySet) {
            nameValuePairs.add(new BasicNameValuePair(entry.getKey(),entry.getValue()));
        }
        CloseableHttpResponse response =null;
        try {
            UrlEncodedFormEntity encodedFormEntity = new UrlEncodedFormEntity(nameValuePairs);
            HttpPost httpPost = new HttpPost(url);
            httpPost.setEntity(encodedFormEntity);
            response = getHttpClient().execute(httpPost);
            if(response.getStatusLine().getStatusCode()==200){
                return EntityUtils.toString(response.getEntity());
            }
        } catch (Exception e){
            e.printStackTrace();
        }finally {
            if(response!=null){
                try {
                    response.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }

    public String doPost (String url){
        return doPost(url,null);
    }

    private CloseableHttpClient getHttpClient(){
        return  beanFactory.getBean(CloseableHttpClient.class);
    }

}
