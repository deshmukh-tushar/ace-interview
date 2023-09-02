package com.javaAceAI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.javaAceAI.dto.AceRequest;
import com.javaAceAI.dto.AceResponse;

@RestController
@RequestMapping("/bot")
@CrossOrigin("*")
public class AceAIController {

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    @Autowired
    private RestTemplate template;

    @GetMapping("/chat")
    public String chat(@RequestParam String prompt){
        AceRequest request=new AceRequest(model, prompt);
        AceResponse aceResponse = template.postForObject(apiURL, request, AceResponse.class);
        return aceResponse.getChoices().get(0).getMessage().getContent();
    }
}
