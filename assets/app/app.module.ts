import { AuthModule } from './auth/auth.module';
import { MessageModule } from './messages/message.module';
import { ErrorService } from './errors/error.service';
import { AuthService } from './auth/auth.service';
import { routing } from './app.routing';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { HeaderComponent } from './header.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { AppComponent } from "./app.component";
import { MessageInputComponent } from './messages/message-input.component';
import { ErrorComponent } from './errors/error.component';

/* AuthenticationComponent não pode ser colocado no componente de AuthModule 
   pois o módulo auth não é carregado no imports do módulo principal abaixo
   e com é referenciado no routing deve ser mantido aqui*/
@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [BrowserModule, routing, HttpModule, MessageModule, AuthModule],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}