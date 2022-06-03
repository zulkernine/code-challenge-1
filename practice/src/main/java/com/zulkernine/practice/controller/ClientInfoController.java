package com.zulkernine.practice.controller;

import com.zulkernine.practice.models.Client;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Iterator;
import java.util.TreeMap;

@RestController
@RequestMapping("/")
public class ClientInfoController {

    @GetMapping
    Client getAllClients(HttpServletRequest request){
        Client.ClientBuilder clientBuilder = new Client.ClientBuilder();

        clientBuilder.withHost(request.getHeader("host")).withCookie(request.getHeader("cookie")).withUserAgent(request.getHeader("user-agent"));
        return clientBuilder.getClient();
    }
}
