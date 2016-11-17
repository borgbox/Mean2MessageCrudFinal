import { platformBrowser } from '@angular/platform-browser';
import { Message } from './message.model';
import { MessageService } from './message.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit {
    //Mensagem corrente
    message: Message;

    //Injeta serviço referenciado no providers
    constructor(private messageService: MessageService) { }

    ngOnInit() {
        //Escuta evento editar lançado pelo serviço e invocado no message component
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message
        );
    }

    onClear(form: NgForm) {
        form.resetForm();
        this.message = null;
    }

    onSubmit(form: NgForm) {

        if (this.message) {
            //Edit
            this.message.content = form.value.content;

            this.messageService.updateMessage(this.message)
                .subscribe(
                //Método 1 sucesso
                result => console.log(result),
                //Método 2 error
                error => console.log(error),
                //Método 3 complete
                () => console.log('Complete')
                );

            this.message = null;
        } else {
            //Create
            const message = new Message(form.value.content, 'Francisco');
            /* O retorno é um Observable que será escutad pelo subscribe.
             Subscribe exije três callbacks um para sucesso, uma pra erro
             e um para processamento completo */
            this.messageService.addMessage(message)
                .subscribe(
                //Método 1 sucesso
                data => console.log(data),
                //Método 2 error
                error => console.log(error),
                //Método 3 complete
                () => console.log('Complete')
                );

        }

        form.resetForm();
    }
}