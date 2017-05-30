package com.taotao.test;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

import java.io.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * Created by zm on 5/27/17.
 */
public class TestFile {
    @Test
    public void testRegx(){
        InputStream stream = ClassLoader.getSystemResourceAsStream("test.js");
        try {

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(ClassLoader.getSystemResourceAsStream("test.js")));
            String line ="";
            while((line =bufferedReader.readLine())!=null){
                Matcher matcher = Pattern.compile("[a-zA-Z_0-9./]*\\.js").matcher(line);
                while (matcher.find()) {
                    System.out.println(matcher.group());
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testCurl(){
        try {

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(ClassLoader.getSystemResourceAsStream("all.txt")));
            String line ="";
            while((line =bufferedReader.readLine())!=null){
                String[] strings = line.split(" ");
                String f = Pattern.compile("\'http[s]?://[a-zA-Z.0-9-]*/").matcher(strings[1]).replaceFirst("/");
                String s = StringUtils.removeEnd(f, "'");
                String s1 = StringUtils.substringBefore(s, "?");
                String[] split = s1.split(",");
                if (split!=null&&split.length>1){
                    for (String sp :
                            split) {
                        String dir = getDir(sp);
                        System.out.println(dir);
                    }
                }else {
                    String dir = getDir(s1);
                    System.out.println(line + dir);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String getDir(String s){
        File file = new File("/home/zm/test", s);
        File dir = file.getParentFile();
        if(!dir.exists()){
            dir.mkdirs();
        }
        String s1 = " -o " + "'"+file.getPath()+"'";
        return s1;
    }
}
