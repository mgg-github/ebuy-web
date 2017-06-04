package com.taotao.web.service;

import com.taotao.common.bean.Content;
import com.taotao.common.bean.EasyUIResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

/**
 * Created by zm on 6/3/17.
 */
@Service
public class IndexService {
    @Autowired
    private ApiService apiService;
    public List<Content> getContentRows(Long categoryId){
        HashMap<String, String> params = new HashMap<>();
        params.put("categoryId",categoryId.toString());
        String doGet = apiService.doGet("http://manage.taotao.com/rest/content", params);
        EasyUIResult easyUIResult = EasyUIResult.formatToList(doGet, Content.class);
        List<Content> rows = (List<Content>) easyUIResult.getRows();
        return rows;
    }
}
