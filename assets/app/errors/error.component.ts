import { ErrorService } from './error.service';
import { Error } from './error.model';
import { Component, OnInit } from '@angular/core';

/* Este componente como pode ser apresentado 
   para todos, como o rodapé e o cabeçalho,
   será inserido no app.component.html */
@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styles: [`
    			background-color: rgba(0,0,0,0.6);
                position: fixed;
                top: 0;
                left:0;
                width:100%;
                height:100vh
            `]
})
export class ErrorComponent implements OnInit {
    error: Error;
    display = 'none';

    constructor(private errorService: ErrorService) { }

    ngOnInit() {
        this.errorService.errorOcurred
            .subscribe(
            (error: Error) => {
            this.error = error;
                this.display = 'block';
            }
            );
    }

    onErrorHandled() {
        this.display = 'none';
    }

}