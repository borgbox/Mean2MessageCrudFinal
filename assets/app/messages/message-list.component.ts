import { MessageService } from './message.service';
import { Message } from './message.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-message-list',
    template: `
              <div class="col-md-8 col-md-offset-2">
            	<!--Angular permite recuperar o valor mandado pelo evento com o variável-->
				<!--de ambiente $event, atribuindo diretamente como no exemplo abaixo-->
				<!-- ou passando o valor por um método -->
				<app-message *ngFor="let message of messages" [message]="message">
				</app-message>
              </div>
              `
})
export class MessageListComponent implements OnInit {

    messages: Message[];

    constructor(private messageService: MessageService) { }

    ngOnInit() {
        this.messageService.getMessages()
            .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
            });
    }
}
