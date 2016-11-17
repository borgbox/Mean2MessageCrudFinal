import { User } from './user.model';
import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    //Representativo do Data ou React driven form
    myForm: FormGroup;

    constructor(private authService: AuthService) { }

    onSubmit() {
        this.authService.signup(new User(this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstname,
            this.myForm.value.lastname))
            .subscribe(
            data => console.log(data),
            error => console.log(error)
            );
        //Limpa campos formulário
        this.myForm.reset();
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstname: new FormControl(null, Validators.required),
            lastname: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
            password: new FormControl(null, Validators.required)
        });
    }


}
