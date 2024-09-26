import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { tap } from 'rxjs';
import { User } from '../../../auth/interfaces/user.interfaces';

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
          <span>{{emailUser}}</span>
        </div>
        <div class="line"></div>
        <div class="img_content">
          <img src="https://reqres.in/img/faces/7-image.jpg" alt="img">
        </div>
        <button (click)="onLout()" class="btn-close"> Cerrar </button>
      </div>
    </div>
    
    <router-outlet></router-outlet>

    <!-- <button (click)="goIntPage()">Ir al Inicio</button> -->
  `,
  styleUrl: './layoutPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPageComponent implements OnInit {

  private user?:User;
  public emailUser:string = '';
  public sideBarItem = [
    {label:'Pagina Ecommer',url:'/ecommer'},
    {label:'Agregar Productos',url:'addProduct'},
    {label:'Lista de Productos',url:'listProduct'},
  
  ]
  

  constructor(
    private router:Router,
    private authService:AuthService
  ){

    this.user = this.authService.currentUser
  }
  


  goIntPage() {
   return  this.router.navigate(['/ecommer']);
  }

  onLout(){
    this.authService.onLout();
    this.goIntPage()
  }

  currenciUser(){
    const user = Array.isArray(this.user) ? this.user[0] : this.user;
    this.emailUser = user.email;
    return this.emailUser;
  }

  ngOnInit(): void {
    this.currenciUser()
  }



}
