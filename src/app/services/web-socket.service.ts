import { Injectable } from '@angular/core';
import { Message, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private retornoMetodoSubject: Subject<string> = new Subject<string>();
  public retornoMetodo$: Observable<string> = this.retornoMetodoSubject.asObservable();
  private connectionStatusSubject: Subject<boolean> = new Subject<boolean>();
  public statusConnection$: Observable<boolean> = this.connectionStatusSubject.asObservable();

  ws: any;
  name: string;
  disabled: boolean;
  private isConnected: boolean = false;

  constructor() {
    const socket = new WebSocket("ws://192.168.200.55:8080/canhoto");

    this.ws = Stomp.over(socket);
    let that = this;

    this.ws.onConnect = (frame) => {
      this.isConnected = true;
      that.connectionStatusSubject.next(true)
      that.ws.subscribe("/errors", function(message) {
        alert("Error " + message.body);
      });

      that.ws.subscribe("/topic/reply", function(message: Message) {
        that.retornoMetodoSubject.next(message.body);
      });

      that.disabled = true;
      //this.ws.activate(); 
    };
    this.ws.onDisconnect = (frame) => {
      this.ws.disconnect();
      //that.connectionStatusSubject.next(false);
      this.isConnected = false;
    };

    this.ws.onWebSocketError = (frame) => { 
      console.log("WebSocket error");
      that.connectionStatusSubject.next(false);
    }
  } 
  public isWebSocketConnected(): boolean {
    return this.isConnected;
  } 

  public conectar(): void {
    this.ws.activate();
  }

  public desconectar(): void {
    if (this.ws != null) {
      this.ws.disconnect();
    }
    console.log("Disconnected");
  }

  executarMetodo(): void {
    if (this.isWebSocketConnected()) {
      this.ws.send("/app/message", {});
    } else {
      console.error('Erro: Conexão WebSocket não está ativa.');
    }
  }

  selecionaCanhotoManual(data): void {
      if (this.isWebSocketConnected()) {
        this.ws.send("/app/canhotoSelecionado", {}, data);
      } else {
        console.error('Erro: Conexão WebSocket não está ativa.');
      }
    }
}
