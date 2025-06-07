import { Component, OnInit } from '@angular/core';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';
import { MenuToggleService } from '../../services/menu-toggle.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterOutlet, AdminMenuComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  isMenuCollapsed: boolean = false;

  constructor(private menuToggleService: MenuToggleService) { }

  ngOnInit() {
    this.menuToggleService.isMenuCollapsed$.subscribe(collapsed => {
      this.isMenuCollapsed = collapsed;
    })
  }
  
  toggleMenu() {
    this.menuToggleService.toggleMenu()
  }
}
