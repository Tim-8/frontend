import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DetaljiComponent } from './detalji/detalji.component';
import { UpisComponent } from './upis/upis.component';

export const routes: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    { path: 'homepage', component: HomepageComponent },
    { path: 'prijava', component: PrijavaComponent },
    { path: 'detalji', component: DetaljiComponent },
    { path: 'upis', component: UpisComponent },
    { path: 'registracija', component: RegistracijaComponent }
];
