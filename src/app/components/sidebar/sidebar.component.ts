import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/hospitales', title: 'Hospitales',  icon: 'local_hospital', class: '' },
    { path: '/doctores', title: 'Doctores',  icon:'favorite', class: '' },
    { path: '/pacientes', title: 'Pacientes',  icon:'face', class: '' },
    { path: '/triage', title: 'Triage',  icon:'create_new_folder', class: '' },
    { path: '/posible-caso', title: '¿Posible caso?',  icon:'error', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
