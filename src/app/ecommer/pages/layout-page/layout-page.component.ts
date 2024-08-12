import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  public sideBarItem = [
    {label:'Inicio',icon:'label',url:'./eco'},
    {label:'Nosotros',icon:'label',url:'./about'},
    {label:'Contacto',icon:'label',url:'./contact'},
  ]

  optionVar(url:string){
    console.log(url)
  }

}
