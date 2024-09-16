import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, Products } from '../../interfaces/product.interfaces';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent {
  
  public productForm: FormGroup;

  public category =[
    {id: 'Electronics',  name: "electronics"},
    {id: 'Jewelery',  name: "jewelery"},
    {id: 'MenSClothing',  name: "men's clothing"},
    {id: 'WomenSClothing',  name: "women's clothing"},
  ];

  public imagePreview: string | ArrayBuffer | null = null;

 constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      // id: [0, [Validators.required]],
      title: ['', [Validators.required]],
      price: [0, [Validators.required,Validators.min(1)]],
      category: ['', [Validators.required]],
      count: [0, [Validators.required,Validators.min(1)]],
      img: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.productForm.get('img')?.valueChanges.subscribe(value => {
      this.imagePreview = value;
    });
  }

  isValidField( field:string, ){
     return this.productForm.controls[field].errors &&  this.productForm.controls[field].touched;
  }

  getFieldError(field:string): string| null{
    if( !this.productForm.controls[field]) return null;

    const errors = this.productForm.controls[field].errors || {};

    for( const key of Object.keys(errors) ){
      switch(key){
        case 'required':
          return 'este campo es requerido';
        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength } `;
        case 'min':
          return 'Las existencias deben de ser mayor 0'
      }
    }

    return '';
  }

  

  onSubmit() {
      

    console.log(this.productForm.value)

  }

}
