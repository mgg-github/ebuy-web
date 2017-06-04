package com.taotao.web.controller;

import com.taotao.common.bean.Content;
import com.taotao.common.bean.EasyUIResult;
import com.taotao.web.service.IndexService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zm on 6/3/17.
 */
@Controller
@RequestMapping("/")
public class IndexController {
    @Autowired
    private IndexService indexService;
    @RequestMapping("/focus")
    public ResponseEntity<List<Map<String, String>>> indexFocus() {
        List<Content> rows = indexService.getContentRows(24L);
        List<Map<String, String>> resultList = new ArrayList<>();
        for (Content c :
                rows) {
            HashMap<String, String> imgMap = new HashMap<>();
            imgMap.put("src", c.getPic());
            imgMap.put("href", c.getUrl());
            imgMap.put("alt", c.getTitle());
            resultList.add(imgMap);
        }
        return ResponseEntity.ok(resultList);
    }

    @RequestMapping("/focus_bottom")
    public ResponseEntity<List<Map<String, String>>> indexFocusBottom() {
        List<Content> rows = indexService.getContentRows(25L);
        List<Map<String, String>> resultList = new ArrayList<>();
        for (Content c :
                rows) {
            HashMap<String, String> imgMap = new HashMap<>();
            imgMap.put("img", c.getPic());
            imgMap.put("t", c.getUrl());
            resultList.add(imgMap);
        }
        return ResponseEntity.ok(resultList);
    }

    @RequestMapping("/seckill")
    public ResponseEntity<List<Map<String, String>>> indexSeckill(){
        List<Content> rows = indexService.getContentRows(28L);
        List<Map<String, String>> resultList = new ArrayList<>();
        for (Content c :
                rows) {
            HashMap<String, String> imgMap = new HashMap<>();
            imgMap.put("imageurl", c.getPic());
            imgMap.put("wname",c.getTitle());
            resultList.add(imgMap);
        }
        return ResponseEntity.ok(resultList);
    }
}
