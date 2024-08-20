import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
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
    if(this.myForm.valid){
      return this.router.navigate(['/ecommer/eco']);
    }

    return 
  }

  registrer() {
    this.router.navigate(['/auth/new-account']);
  }

}
