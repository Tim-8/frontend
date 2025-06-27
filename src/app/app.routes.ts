import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DetaljiComponent } from './detalji/detalji.component';
import { UpisComponent } from './upis/upis.component';
import { AktivacijaComponent } from './admin/aktivacija/aktivacija.component';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NastavnikFormaComponent } from './admin/nastavnik-forma/nastavnik-forma.component';
import { PregledKorisnikaComponent } from './admin/pregled-korisnika/pregled-korisnika.component';
import { IzmeniComponent } from './izmeni/izmeni.component';
import { OsobljeFormaComponent } from './admin/osoblje-forma/osoblje-forma.component';
import { FakultetStranicaComponent } from './admin/fakulteti/fakultet-stranica/fakultet-stranica.component';
import { FakultetDetaljiComponent } from './fakultet-detalji/fakultet-detalji.component';
import { StudijskiProgramStranicaComponent } from './admin/studijski-programi/studijski-program-stranica/studijski-program-stranica.component';
import { UniverzitetComponent } from './admin/univerzitet/univerzitet.component';
import { OsobljeDashboardComponent } from './osoblje/osoblje-dashboard/osoblje-dashboard.component';
import { PregledStudenataComponent } from './osoblje/studenti/pregled-studenata/pregled-studenata.component';
import { StudijskiProgramDetaljiComponent } from './studijski-program-detalji/studijski-program-detalji.component';
import { StudentFormaComponent } from './osoblje/studenti/student-forma/student-forma.component';
import { RasporedNastaveComponent } from './osoblje/raspored-nastave/raspored-nastave.component';
import { StudentPregledComponent } from './student/student-pregled/student-pregled.component';
import { StudentPrijavaComponent } from './student/student-prijava/student-prijava.component';
import { StudentHistoryComponent } from './student/student-history/student-history.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'homepage', pathMatch: 'full' },
    { path: 'homepage', component: HomepageComponent },
    { path: 'prijava', component: PrijavaComponent },
    { path: 'registracija', component: RegistracijaComponent },
    { path: 'izmeni', component: IzmeniComponent },
    { path: 'detalji', component: DetaljiComponent },
    { path: 'upis', component: UpisComponent },
    { path: 'fakulteti/:id', component: FakultetDetaljiComponent },
    { path: 'studijskiProgrami/:id', component: StudijskiProgramDetaljiComponent},
    { 
        path: 'admin-dashboard', component: AdminDashboardComponent,
        children: [
            { path: '', redirectTo: 'aktivacija', pathMatch: 'full' },
            { path: 'pregled-korisnika', component: PregledKorisnikaComponent }, 
            { path: 'aktivacija', component: AktivacijaComponent },
            { path: 'nastavnik-forma', component: NastavnikFormaComponent },
            { path: 'osoblje-forma', component: OsobljeFormaComponent },
            { path: 'univerzitet', component: UniverzitetComponent },
            { path: 'fakultet-stranica', component: FakultetStranicaComponent },
            { path: 'studijski-program-stranica', component: StudijskiProgramStranicaComponent }, 
        ],
        data: { requiredRoles: ["ROLE_ADMIN"] }, canActivate: [authGuard]
    },
    {
        path: 'osoblje-dashboard', component: OsobljeDashboardComponent,
        children: [
            { path: '', redirectTo: 'dodaj-studenta', pathMatch: 'full' },
            { path: 'dodaj-studenta', component: StudentFormaComponent },
            { path: 'pregled-studenata', component: PregledStudenataComponent },
            { path: 'raspored-nastave', component: RasporedNastaveComponent }
        ],
        data: { requiredRoles: ["ROLE_OSOBLJE"] }, canActivate:[authGuard]
    },
    {
        path: 'student-dashboard', component: StudentDashboardComponent,
        children: [
            { path: '', redirectTo: 'pregled', pathMatch: 'full' },
            { path: 'pregled', component: StudentPregledComponent },
            { path: 'prijava', component: StudentPrijavaComponent },
            { path: 'istorija', component: StudentHistoryComponent }
        ],
        data: { requiredRoles: ["ROLE_STUDENT"] }, canActivate: [authGuard]
    }

];
