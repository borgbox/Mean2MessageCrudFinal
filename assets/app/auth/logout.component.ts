import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-logout',
    template: `
    	<div class="col-md-8 col-md-offset-2">
        	<button class="btn btn-danger" (click)="onLogout()">Logout</button>
        </div>
    `
})
export class LogoutComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() { }

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin'])
    }

    isLoggedIn() {
        return localStorage.getItem('token') != null;
    }
}


