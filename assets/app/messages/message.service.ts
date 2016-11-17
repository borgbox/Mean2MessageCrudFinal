import { ErrorService } from './../errors/error.service';
import { HeaderComponent } from './../header.component';
import { Message } from './message.model';

import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
//Biblioteca de terceiros para Observable
import 'rxjs/Rx';
import { Observable } from 'rxjs';

/* 
Como precisamos injetar um serviço, no caso Http, e o Angular
somente permite injeção de dependência em classes que possuem 
algum tipo de metadata por isso utilizamos Injectable e importar
o módulo HttpModule no atributo importas do NgModule
*/
@Injectable()
export class MessageService {

    messageIsEdit = new EventEmitter<Message>();

    messages: Message[] = [];
    //Injeção do serviço Http
    constructor(private http: Http, private errorService: ErrorService) { }

    addMessage(message: Message) {
        //this.messages.push(message);
        const body = JSON.stringify(message);
        //É necessário informar que o corpo da requisição é Json daí cria-se o HeaderComponent
        const headers = new Headers({ 'content-Type': 'application/json' });
		/* Carrega token para adicioná-lo a requisição. O ponto de interrogação
        no final é para impedir a continuidade do código caso o valor retornado
        seja nulo, ou adicionar o parametro a URL*/

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        /* Esta linha somente monta a requisição Observable e ainda não enviou
          pois ninguém está escutando ou subscribing.
          O import rxjs/Rx serve para tratar Observables e permitir o uso do métdo map abaixo */
        return this.http.post('http://localhost:3000/message' + token, body, { headers: headers })
            .map((response: Response) => {
                response.json()
                const result = response.json();
                message = new Message(result.obj.content,
                    result.obj.user.firstname,
                    result.obj._id,
                    result.obj.user._id);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => { 
                						this.errorService.handleError(error.json())
                                        return Observable.throw(error.json());
                						});
    }

    //Lança evento de edição e o objeto a ser editado é passado
    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({ 'content-Type': 'application/json' });

		/* Carrega token para adicioná-lo a requisição. O ponto de interrogação
        no final é para impedir a continuidade do código caso o valor retornado
        seja nulo, ou adicionar o parametro a URL*/
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, { headers: headers })
            .map((response: Response) => response.json())
            .catch((error: Response) => { 
                						this.errorService.handleError(error.json())
                                        return Observable.throw(error.json());
                						});
    }

    getMessages() {
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                //Transforma no formato de mensagens baseada na classe modelo para esse objeto
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(message.content,
                        message.user.firstname,
                        message._id,
                        message.user._id));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => { 
                						this.errorService.handleError(error.json())
                                        return Observable.throw(error.json());
                						});
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        const body = JSON.stringify(message);
        const headers = new Headers({ 'content-Type': 'application/json' });

		/* Carrega token para adicioná-lo a requisição. O ponto de interrogação
        no final é para impedir a continuidade do código caso o valor retornado
        seja nulo, ou adicionar o parametro a URL*/
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => { 
                						this.errorService.handleError(error.json())
                                        return Observable.throw(error.json());
                						});
    }
}