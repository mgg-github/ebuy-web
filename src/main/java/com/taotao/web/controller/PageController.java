package com.taotao.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by zm on 5/26/17.
 */
@Controller
@RequestMapping("/")
public class PageController {
    @RequestMapping("/{pageName}")
    public String toPage(@PathVariable("pageName") String pageName){
        return pageName;
    }
}
