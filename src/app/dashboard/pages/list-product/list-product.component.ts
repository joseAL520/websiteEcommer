import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{

  public productTem = [{
    id:1,
    nombre:'pan',
    cantidad:2,
    price:12312,
    category:'men cloting',
  },
  {
    id:2,
    nombre:'as',
    cantidad:2,
    price:12312,
    category:'men cloting',
  },
  {
    id:3,
    nombre:'cas',
    cantidad:2,
    price:12312,
    category:'men cloting',
  },
  {
    id:4,
    nombre:'lan',
    cantidad:2,
    price:12312,
    category:'men cloting',
  },
  {
    id:5,
    nombre:'ras',
    cantidad:2,
    price:12312,
    category:'men cloting',
  },
  {
    id:6,
    nombre:'ddew',
    cantidad:2,
    price:12312,
    category:'men cloting',
  },
  {
    id:7,
    nombre:'p112an',
    cantidad:2,
    price:12312,
    category:'men cloting',
  },
  {
    id:8,
    nombre:'padadan',
    cantidad:2,
    price:12312,
    category:'men cloting',
  },
  {
    id:9,
    nombre:'paasdasdn',
    cantidad:2,
    price:12312,
    category:'men cloting',
  },
  {
    id:10,
    nombre:'paaaan',
    cantidad:2,
    price:12312,
    category:'men cloting',
  },
  {
    id:11,
    nombre:'p11123an',
    cantidad:2,
    price:12312,
    category:'men cloting',
  },
  {
    id:12,
    nombre:'pg14341an',
    cantidad:2,
    price:12312,
    category:'men cloting',
  }]

  public myFom: FormGroup;

  public productList = [{
    id: 0,
    nombre: '',
    cantidad: 0,
    price: 0,
    category: '',
  }];
  public currentIndex= 0;
  public pageSize = 10;


  constructor(
    private fb: FormBuilder
  ){
    this.myFom = this.fb.group({ nameBuscador:[''] })
  }


  ngOnInit(): void {
     this.getProduct();
  }


  getProduct(){
    // sort() ayuda arganizarlo alfabeticamente
    this.productList =  this.productTem.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }

  searchProduct(){
    const refProduct = this.myFom.value.nameBuscador;
     return this.productList.filter(value => {
          if(refProduct === value.nombre){
                this.productList = [{
                id: value.id,
                nombre: value.nombre,
                cantidad: value.cantidad,
                price: value.price,
                category: value.category,
              }]
          }
          
          if(refProduct === ''){
            this.getProduct();
          }

      })
  }

  onDeleterUser(id:number) {
      console.log(id)
  }
  updateProductById(product: any) {
    console.log(product)
  }
  openModalInfo(product: any) {
    console.log('modal',product)
  }

  next(){
    this.currentIndex += this.pageSize;
    this.productList;
  }

  previous() {
    this.currentIndex -= this.pageSize;
    if (this.currentIndex < 0) {
      this.currentIndex = 0;
    }
    this.productList;
  }



  


}
