import { LogoutComponent } from './logout.component';
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';
import { Routes, RouterModule } from '@angular/router';

/*
Nesse caso como é uma rota filha não se adiciona o caracter "/"
pois vai incrementar a rota auth. A constante será AUTH_ROUTES
será exportada para ser referenciada no app.routing.ts
*/
const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'signup', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent },
];

export const authRouting = RouterModule.forChild(AUTH_ROUTES);

