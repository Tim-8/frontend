import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentMenuComponent } from '../student-menu/student-menu.component';
import { MenuToggleService } from '../../services/menu-toggle.service';

@Component({
  selector: 'app-student-dashboard',
  imports: [RouterOutlet, StudentMenuComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  isMenuCollapsed: boolean = false;

  constructor(private menuToggleService: MenuToggleService) {}

  ngOnInit() {
    this.menuToggleService.isMenuCollapsed$.subscribe(collapsed => {
      this.isMenuCollapsed = collapsed;
    })
  }

  toggleMenu() {
    this.menuToggleService.toggleMenu()
  }
}
