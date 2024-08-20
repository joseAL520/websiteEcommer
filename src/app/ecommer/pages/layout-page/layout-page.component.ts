import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  constructor(private router:Router){}

  public sideBarItem = [
    {label:'Inicio',icon:'label',url:'./eco'},
    {label:'Nosotros',icon:'label',url:'./about'},
    {label:'Contacto',icon:'label',url:'./contact'},
    {label:'Panel',icon:'label',url: '/dash'},
  ]

  loginUser() {
    this.router.navigate(['/auth/login']);
  }

}
