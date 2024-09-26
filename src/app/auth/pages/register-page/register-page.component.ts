import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidatorService } from '../../services/validator.service';
import { User } from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {


  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService:AuthService,
    private validatorService:ValidatorService
  ) {
    
    this.myForm = this.fb.group({
      email:['',[Validators.required, this.validatorService.emailFormatValidator() ]],
      password:['',[Validators.required, Validators.minLength(8)]],
      password2:['',[Validators.required,]],
      role_name: ['']
    },{
      validators:[
        this.validatorService.ifFieldOneEqualFieldTwo('password','password2'),

      ]
    });

  }


  get currientUser(): User {
    return this.myForm.value as User;
  }

  isValidField( field: string ) {
    return this.validatorService.isValidField( this.myForm , field);
}

  getFieldError(field:string): string| null{
    return this.validatorService.getFieldError(this.myForm, field);
  }
     
  onSave() {
    if(this.myForm.valid){
      return this.authService.register(this.currientUser).subscribe( () =>
        this.router.navigate(['/ecommer/eco'])
      )
    }

    return 
  }

  

}
