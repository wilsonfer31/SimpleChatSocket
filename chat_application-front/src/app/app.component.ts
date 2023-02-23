import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebSocketChatRoom';

  greetings: string[] = [];
  disabled = true;
  newmessage: string | undefined;
  private stompClient : Stomp.Client | null = null;

  constructor(){}

  ngOnInit() {
    this.connect();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/testchat');
    this.stompClient = Stomp.over(socket);

    const that = this;
    this.stompClient.connect({}, function (frame : any) {
      if(that.stompClient != null){
        that.stompClient.subscribe('/start/initial', (message : any)  => {
          that.showMessage(message.body);
      });
      }
     
    });
  }

  sendMessage() {
    this.stompClient?.send(
      '/current/resume',
      {},
      JSON.stringify(this.newmessage)
    );
    this.newmessage = "";
  }

  showMessage(message : string) {
    this.greetings.push(message);
  }
}