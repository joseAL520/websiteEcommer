import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <div class="sliderBar">

    <div class="containerLog">
        <div class="container_logo">
            <img class="container_logo_img" src="https://cdn-icons-png.flaticon.com/512/63/63966.png" alt="logo">
        </div>
        <p class="title_logo">вента</p>
    </div>

    <div class="nav_cotainer">
       <div class="container_nav" *ngFor="let item of sideBarItem">
           <button class="nav_link" [routerLink]="item.url" >{{item.label}}</button>
       </div>
   </div>

      <div class="content_user">
        <div class="email_name">
          <span>correorName</span>
        </div>
        <div class="line"></div>
        <div class="img_content">
          <img src="https://reqres.in/img/faces/7-image.jpg" alt="img">
        </div>
      </div>
    </div>
    
    <router-outlet></router-outlet>

    <!-- <button (click)="goIntPage()">Ir al Inicio</button> -->
  `,
  styleUrl: './layoutPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPageComponent {



constructor(private router:Router){}


public sideBarItem = [
  {label:'Pagina Ecommer',url:'/ecommer'},
  {label:'Agregar Productos',url:'addProduct'},
  {label:'Lista de Productos',url:'listProduct'},

]


goIntPage() {
  this.router.navigate(['/ecommer']);
}

}
