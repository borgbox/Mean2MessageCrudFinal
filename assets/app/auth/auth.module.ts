import { authRouting } from './auth.routing';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { LogoutComponent } from './logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [ReactiveFormsModule, CommonModule, authRouting],
    exports: [],
    declarations: [LogoutComponent,
        SigninComponent,
        SignupComponent],
    providers: [],
})
export class AuthModule { }
