import { AuthModule } from './auth/auth.module';
/* AUTH_ROUTES - é a subrote para autenticação */
import { AuthenticationComponent } from './auth/authentication.component';
import { MessagesComponent } from './messages/messages.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* O carregamento utiliando "loadChildren" faz o lazy loading do módulo
   o qual recebe o caminho do aruivo do módulo sem extensão e o nome
   da classe associada após # */

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/messages', pathMatch: 'full' },
    { path: 'messages', component: MessagesComponent },
    { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule'},
];

/* 
	Este trecho registra as rotas no modulo router 
    do Angular e depois exportar no app.module via
    import, no atributo imports do NgModule
    da constante abaixo nomeada de routing	
*/
export const routing = RouterModule.forRoot(APP_ROUTES);