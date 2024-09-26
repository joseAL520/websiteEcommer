import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    
    this.myForm = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]],
    });

  }

  isValidField( field:string, ){
    return this.myForm.controls[field].errors 
      &&  this.myForm.controls[field].touched;
  }

  getFieldError(field:string): string| null{
    if( !this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for( const key of Object.keys(errors) ){
      switch(key){
        case 'required':
          return 'este campo es requerido';
        case 'email':
           return `el formato de correo no corresponde`;
      }
    }

    return '';
  }
     
  onSave() {
    const user = this.myForm.value.email;
    const password = this.myForm.value.password;
    if(this.myForm.valid){

      this.authService.login(user,password).pipe(
        tap( user => {
          if (!user || Object.keys(user).length === 0) {
              alert('las credenciales no Coinciden')
          }else{
            this.router.navigate(['/ecommer/eco']);
          }
        })
      ).subscribe()
     
    }

    return 
  }


  registrer() {
    this.router.navigate(['/auth/new-account']);
  }

}
