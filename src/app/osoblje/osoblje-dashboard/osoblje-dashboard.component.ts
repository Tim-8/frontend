import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OsobljeMenuComponent } from '../osoblje-menu/osoblje-menu.component';
import { MenuToggleService } from '../../services/menu-toggle.service';

@Component({
  selector: 'app-osoblje-dashboard',
  imports: [RouterOutlet, OsobljeMenuComponent],
  templateUrl: './osoblje-dashboard.component.html',
  styleUrl: './osoblje-dashboard.component.css'
})
export class OsobljeDashboardComponent {
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
