import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuToggleService {
  private _isMenuCollapsed = new BehaviorSubject<boolean>(false); 
  isMenuCollapsed$: Observable<boolean> = this._isMenuCollapsed.asObservable();

  constructor() { }

  toggleMenu() {
    this._isMenuCollapsed.next(!this._isMenuCollapsed.value);
  }

  get isCollapsed(): boolean {
    return this._isMenuCollapsed.value;
  }
}
