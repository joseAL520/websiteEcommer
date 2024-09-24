import { Component } from '@angular/core';
import { Router, UrlSegment } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interfaces';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {

  public userEmail:string='';
  constructor(
    private router:Router,
    private authServices :AuthService

  ){}
 

  public sideBarItem = [
    {label:'Inicio',icon:'label',url:'./eco'},
    {label:'Nosotros',icon:'label',url:'./about'},
    {label:'Contacto',icon:'label',url:'./contact'},
    {label:'Panel',icon:'label',url: '/dash'},
  ]


  get user():User | undefined{
    const user = this.authServices.currentUser
    this.userVal(user)
    return user;
  }

  userVal(user:User | undefined){
    if (user) {
      const currentUser = Array.isArray(user) ? user[0] : user;
      this.userEmail = currentUser.email
    } 
  }

  loginUser() {
    this.router.navigate(['/auth/login']);
  }

  onlogout(){
    this.userEmail = ''
    this.authServices.onLout();
  }


  
}



