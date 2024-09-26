import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  
  public  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { }



  isValidField( myForm:FormGroup, field:string, ){
    return myForm.controls[field].errors &&  myForm.controls[field].touched;
  }

  getFieldError( myForm:FormGroup , field:string): string| null{
    if( !myForm.controls[field]) return null;

    const errors = myForm.controls[field].errors || {};

    for( const key of Object.keys(errors) ){
      switch(key){
        case 'required':
          return 'este campo es requerido';
        case 'minlength':
           return `Minimo ${ errors['minlength'].requiredLength } caracteres `;
        case 'notEqual':
            return 'Las contraseñas no son iguales';
        case 'invalidEmail':
            return 'El formato de correo no coincide';
        
      }
    }

    return '';
  }

  public emailFormatValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const valid = emailRegex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  public ifFieldOneEqualFieldTwo(field: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;
  
      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true };
      }
  
      formGroup.get(field2)?.setErrors(null);
      return null;
    };
  }
  


}
