import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
    //Representativo do Data ou React driven form
    myForm: FormGroup;

    constructor(private authService: AuthService, private router: Router) { }

    onSubmit() {
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
            data => {
                /*Opção por localstorage em vez de cookies*/
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                //Após sigin navega para a tela inicial
                this.router.navigateByUrl('/');
            },
            error => console.log(error)
            );
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
            password: new FormControl(null, Validators.required)
        });
    }

}