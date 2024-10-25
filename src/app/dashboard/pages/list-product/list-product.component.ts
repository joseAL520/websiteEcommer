import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValueChangeEvent } from '@angular/forms';
import { ProductServiceService } from '../../services/product-service.service';
import { map, tap } from 'rxjs';
import { Products } from '../../interfaces/product.interfaces';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit{

  public myFom: FormGroup;
  public productList: Products[] = []; 
  public currentIndex= 0;
  public pageSize = 10;
  public productInf: Products[] = [];
  public isModalOpen = false;


  constructor(
    private fb: FormBuilder,
    private serviceProduct: ProductServiceService,
    private cdr: ChangeDetectorRef
  ){
    this.myFom = this.fb.group({ nameBuscador:[''] })
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.serviceProduct.getProducts().subscribe(data => {
      this.productList = data;
      this.productList.sort((a,b)=> a.title.localeCompare(b.title))
      this.cdr.detectChanges(); // Fuerza la detección de cambios
    });
  }

  searchProduct(){
    const refProduct = this.myFom.value.nameBuscador;
     return this.productList.filter(value => {
          if(refProduct === value.title){
                this.productList = [{
                  id: value.id,
                  title: value.title,
                  price: value.price,
                  category: value.category,
                  description: '',
                  image: '',
                  rate: 0,
                  count: 0,
                  selected:false
                }]
          }
          
          if(refProduct === ''){
            this.getProduct();
          }

      })
  }

  onDeleterUser(id:number) {
      this.serviceProduct.deleteProduct(id).subscribe(() => this.getProduct() )
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


  openModalInfo(product: Products) {
    if(this.productInf.length > 0){
        this.productInf.pop();
    }

    this.productInf.push(product);
    this.isModalOpen = true;
  }
  closeModalInfo() {
    this.isModalOpen = false;
  }
}
