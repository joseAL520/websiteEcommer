import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Products } from '../interfaces/product.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private apiUrl = 'https://irqhygyekqynuaclywxk.supabase.co/rest/v1/products?select=*';
  private apiUrl2 = 'https://irqhygyekqynuaclywxk.supabase.co/rest/v1/products';
  private apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycWh5Z3lla3F5bnVhY2x5d3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3NjMzNDcsImV4cCI6MjA0MjMzOTM0N30.XEYH2lHULa8u_7fwfvU006Yqzd80YkqflSru12B5hPw';
  private authorization =' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycWh5Z3lla3F5bnVhY2x5d3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3NjMzNDcsImV4cCI6MjA0MjMzOTM0N30.XEYH2lHULa8u_7fwfvU006Yqzd80YkqflSru12B5hPw';


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Products[]> {
    const headers = new HttpHeaders({
      'apikey': this.apikey,
      'Authorization': this.authorization
    })
    return this.http.get<Products[]>(this.apiUrl,{headers}).pipe(
      map(products => products.sort((a, b) => a.title.localeCompare(b.title)))
    );
  }

  getProductByid(id:number):Observable<Products>{
    const headers = new HttpHeaders({
      'apikey': this.apikey,
      'Authorization': this.authorization
    });
    
    return this.http.get<Products[]>(`${this.apiUrl2}?id=eq.${id}`, { headers }).pipe(
      map(products => products[0]) // Asegúrate de que estás extrayendo el primer elemento
    );
  }

  aggProduct(product:Products):Observable<Products[]>{
    const headers = new HttpHeaders({
      'apikey': this.apikey,
      'Authorization': this.authorization
    })
    return this.http.post<Products[]>(this.apiUrl2,product,{headers});
  }

  updateProduct(product:Products):Observable<Products>{
    const headers = new HttpHeaders({
      'apikey': this.apikey,
      'Authorization': this.authorization
    })
    return this.http.patch<Products>(`${this.apiUrl2}?id=eq.${product.id}`,product, { headers });
  }

  deleteProduct(id:number):Observable<boolean>{
    const headers = new HttpHeaders({
      'apikey': this.apikey,
      'Authorization': this.authorization
    })
    return this.http.delete<Products>(`${this.apiUrl2}?id=eq.${id}`, { headers }).pipe(
      map(rep => true ),
      catchError(err => of (false) )
    );
    
  } 

}
