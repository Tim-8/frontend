import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NastavnikMenuComponent } from '../nastavnik-menu/nastavnik-menu.component';
import { MenuToggleService } from '../../services/menu-toggle.service';

@Component({
  selector: 'app-nastavnik-dashboard',
  imports: [RouterOutlet, NastavnikMenuComponent],
  templateUrl: './nastavnik-dashboard.component.html',
  styleUrl: './nastavnik-dashboard.component.css'
})
export class NastavnikDashboardComponent {
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
