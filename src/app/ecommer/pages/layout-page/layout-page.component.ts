import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interfaces';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent implements OnInit {
  isMenuOpen = false;


  constructor(
    private router:Router,
    private authServices :AuthService

  ){}

 

  public sideBarItem = [
    {label:'Inicio',icon:'label',url:'./eco'},
    {label:'Nosotros',icon:'label',url:'./about'},
    {label:'Contacto',icon:'label',url:'./contact'},
  ]


  get user():User | undefined{
    const user = this.authServices.currentUser
    const currentUser = Array.isArray(user) ? user[0] : user;
    return currentUser;
  }


  loginUser() {
    this.router.navigate(['/auth/login']);
  }

  onlogout(){
    this.authServices.onLout();
  }

  goDash() {
    this.router.navigate(['/dash']);
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
}

  ngOnInit(): void {
      this.authServices.checkAuthentication().subscribe()
  }

}



