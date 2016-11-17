import { MessageService } from './message.service';
import { Message } from './message.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: [`
      .author{
          display: inline-block;
          font-style: italic;
          font-size: 12px;
          width: 80%
      }  
      .config{
          display: inline-block;
          text-align: right;
          font-size: 12px;
          width: 19%;
      }
    `]
})
export class MessageComponent implements OnInit {
    /* Atributo que com a notação Input poderá ser utilizado
       e como atributo com [] na tag app-message no html e dessa 
       forma será feito o binding  
    */
    //Cria um atributo
    @Input() message: Message;

    /*Cria evento: EventEmitter é um generic en defini-se, nesse caso como string.
                   mas pode ser um tipo any também com esse objeto em mãos o método
                   onEdit emite o evento escutado em app.component.html*/
    //@Output() editClicked = new EventEmitter<string>();

    constructor(private messageService: MessageService) { }

    ngOnInit() { }

    onDelete() {
        this.messageService.deleteMessage(this.message)
            .subscribe();
    }

    onEdit() {
        this.messageService.editMessage(this.message);
    }

    //Verifica se a mensagem pertence ao usuário linha a linha, para assim controlar os botões
    belongsToUser() {
        return localStorage.getItem('userId') == this.message.userId;
    }
}