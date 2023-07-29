import { CanhotoComponent } from './../components/canhoto/canhoto.component';
import { Injectable } from '@angular/core';
import { Stomp, Message  } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private retornoMetodoSubject: Subject<string> = new Subject<string>();
  public retornoMetodo$: Observable<string> = this.retornoMetodoSubject.asObservable();

  ws: any;
  name: string;
  disabled: boolean;

  constructor() {
   //connect to stomp where stomp endpoint is exposed
    //let ws = new SockJS("http://localhost:8080/greeting");
    let socket = new WebSocket("ws://localhost:8080/canhoto");
    this.ws = Stomp.over(socket);
    let that = this;

    this.ws.connect({}, function(frame) {
      that.ws.subscribe("/errors", function(message) {
        alert("Error " + message.body);
      });

      that.ws.subscribe("/topic/reply", function(message: Message) {
        //console.log(message.body);
        that.retornoMetodoSubject.next(message.body);
      });

      that.disabled = true;
    }, function(error) {
      alert("STOMP error " + error);
    });
  } 

  public conectar(): void {
    this.ws.activate();
    //this.ws.reconnectDelay = 5000;
  }

  public desconectar(): void {
    if (this.ws != null) {
      this.ws.disconnect();
    }
    //this.canhotoComponent.setConnected(false);
    console.log("Disconnected");
  }



  executarMetodo(): void {
  //executarMetodo(data: string): void {
    // Verifique se a conexão WebSocket está ativa antes de enviar a mensagem.
    if (this.ws.active) {
      //this.ws.send("/app/message", {}, data);
      this.ws.send("/app/message", {});
    } else {
      console.error('Erro: Conexão WebSocket não está ativa.');
    }
  }
  
  

}
