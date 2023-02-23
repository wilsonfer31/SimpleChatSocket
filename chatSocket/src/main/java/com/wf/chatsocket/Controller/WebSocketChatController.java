package com.wf.chatsocket.Controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;


@Controller
public class WebSocketChatController {
    @MessageMapping("/resume")
    @SendTo("/start/initial")
    public String chat(String msg, SimpMessageHeaderAccessor ha) {
        System.out.println(msg);
       String ip = "IP : " + ha.getSessionAttributes().get("ip").toString()+ " ";
        String session = "Session :" + ha.getSessionId() + " ";
        String returnMessage = ip +  session + msg;
        return returnMessage;
    }

}
