import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Products } from '../../interfaces/product.interfaces';
import { ProductServiceService } from '../../services/product-service.service';
import { map, switchMap, tap, of, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'] // Corrige a `styleUrls` en lugar de `styleUrl`
})
export class AddNewProductComponent implements OnInit {

  public productForm: FormGroup;
  public product$: Observable<Products | undefined> | undefined;
  public category = [
    { id: Category.Electronics, name: "electronics" },
    { id: Category.Jewelery, name: "jewelery" },
    { id: Category.MenSClothing, name: "men's clothing" },
    { id: Category.WomenSClothing, name: "women's clothing" },
  ];

  public imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private serviceProduct: ProductServiceService,
    private router: Router,
    private activateRouter: ActivatedRoute,
  ) {
    this.productForm = this.fb.group({
      id: [''], // Inicializa el campo id como cadena vacía
      title: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(1)]],
      category: ['', [Validators.required]],
      count: [0, [Validators.required, Validators.min(1)]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.productForm.get('image')?.valueChanges.subscribe(value => {
      this.imagePreview = value;
    });
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
  
    this.activateRouter.params
      .pipe(
        switchMap(({ id }) => this.serviceProduct.getProductByid(id))
      )
      .subscribe(
        prod => {
          if (!prod) {
            this.router.navigateByUrl('/');
            return;
          }
          this.productForm.patchValue({
            id: prod.id,
            title: prod.title,
            price: prod.price,
            category: prod.category, // Asegúrate de que esto coincida con los valores en el select
            count: prod.count,
            image: prod.image,
            description: prod.description
          });
          this.imagePreview = prod.image;
        },
        error => {
          console.error('Error fetching product:', error);
          this.router.navigateByUrl('/');
        }
      );
}

  
  

  isValidField( field:string ){
     return this.productForm.controls[field].errors &&  this.productForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.productForm.controls[field]) return null;

    const errors = this.productForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength}`;
        case 'min':
          return 'Las existencias deben de ser mayor 0';
      }
    }

    return '';
  }

  get currientProduct(): Products {
    return this.productForm.value as Products;
  }

  generateUniqueRandomId(): Observable<number> {
    const max = Number.MAX_SAFE_INTEGER;

    return this.serviceProduct.getProducts().pipe(
      map((products: Products[]) => products
        .map(product => product.id)
        .filter((id): id is number => id !== undefined) // Filtramos los IDs que no son undefined
      ),
      switchMap((ids: number[]) => {
        let numberRandom = Math.floor(Math.random() * max) + 1;

        // Verificar si el número generado es único
        while (ids.includes(numberRandom)) {
          numberRandom = Math.floor(Math.random() * max) + 1;
        }
        return of(numberRandom); // Devolver el número único como Observable
      }),
      tap({
        error: (err: any) => {
          console.error('Error al generar ID:', err);
        }
      })
    );
  }

  onSubmit():void {
    if (this.productForm.invalid) return;

    if(this.currientProduct.id){
        this.serviceProduct.updateProduct(this.currientProduct).subscribe()
        this.router.navigate(['/dash/']);
        return
    }

    this.generateUniqueRandomId().pipe(
          switchMap((uniqueId: number) => {
            this.productForm.patchValue({ id: uniqueId });
            return this.serviceProduct.aggProduct(this.currientProduct); 
          }))
        .subscribe({
          next: () => {
            this.productForm.reset();
          },
          error: (err: any) => {
            console.error('Error al agregar producto:', err);
          }
      });

      
    }
  
}
