import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-authentication',
    template: `
            	<header class="row spacing">
                	<nav class="col-md-8 col-md-offset-2">
                    	<ul class="nav nav-tabs">
                        	<li routerLinkActive="active"><a [routerLink]="['signup']">Signup</a></li>
                            <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signin']">Signin</a></li>
                            <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['logout']">Logout</a></li>
                        </ul>
                    </nav>
                </header>
                <div class="row spacing">
                	<!--Subrotas configurado em auth.routes.ts-->
                	<router-outlet></router-outlet>
                <div>
              `
})
export class AuthenticationComponent implements OnInit {
    constructor(private authService: AuthService) { }

    ngOnInit() { }

    isLoggedIn() {
        //Verifica a presença do token para na diretiva ngIf ser utilizado
        return this.authService.isLoggedIn();
    }
}