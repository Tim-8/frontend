import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';

export const routes: Routes = [
    { path: '', redirectTo: 'prijava', pathMatch: 'full' },
    { path: 'prijava', component: PrijavaComponent },
    { 
        path: 'registracija', component: RegistracijaComponent,
        data: { requiredRoles: ["ROLE_ADMIN"] }, canActivate: [authGuard]
    }
];
