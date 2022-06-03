package com.zulkernine.practice.models;

public class Client {


    String host;
    String cookie;
    String userAgent;

    private Client(){}

    public Client(String host, String cookie, String userAgent) {
        this.host = host;
        this.cookie = cookie;
        this.userAgent = userAgent;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getCookie() {
        return cookie;
    }

    public void setCookie(String cookie) {
        this.cookie = cookie;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public static class ClientBuilder {
        Client c;

        public ClientBuilder(){
            c = new Client();
        }

        public ClientBuilder withHost(String h){
            c.setHost(h);
            return this;
        }

        public ClientBuilder withCookie(String ck){
            c.setCookie(ck);
            return this;
        }

        public ClientBuilder withUserAgent(String ua){
            c.setUserAgent(ua);
            return this;
        }

        public void build() {}

        public Client getClient(){ return c; }
    }
}
