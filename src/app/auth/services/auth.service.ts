import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interfaces';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase:string = 'https://irqhygyekqynuaclywxk.supabase.co/rest/v1/user'
  private apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycWh5Z3lla3F5bnVhY2x5d3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3NjMzNDcsImV4cCI6MjA0MjMzOTM0N30.XEYH2lHULa8u_7fwfvU006Yqzd80YkqflSru12B5hPw';
  private authorization =' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlycWh5Z3lla3F5bnVhY2x5d3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3NjMzNDcsImV4cCI6MjA0MjMzOTM0N30.XEYH2lHULa8u_7fwfvU006Yqzd80YkqflSru12B5hPw';
  private user?: User;


  constructor(
    private http: HttpClient
  ) {}

  
  get currentUser(): User| undefined {
    if(!this.user) return undefined;
    return structuredClone(this.user); 
  }
  

  login(email:string, password:string ): Observable<User>{
    const headers = new HttpHeaders({
      'apikey': this.apikey,
      'Authorization': this.authorization
    })
    const url = `${this.urlBase}?email=eq.${email}&password=eq.${password}`;
    return this.http.get<User>(url,{headers}).pipe(
      tap( user => this.user = user),
      tap( user => localStorage.setItem('user',JSON.stringify(user))),
    );
  }

  register(user:User){
    const headers = new HttpHeaders({
      'apikey': this.apikey,
      'Authorization': this.authorization
    })
    
   const valueUser = user
    return this.http.post<User>(this.urlBase,user,{headers}).pipe(
      tap( user => localStorage.setItem('user',JSON.stringify( [valueUser]))),
    );
  }

  checkAuthentication():Observable<boolean> {
    if(!localStorage.getItem('user') ) return of(false)

    const headers = new HttpHeaders({
      'apikey': this.apikey,
      'Authorization': this.authorization
    })
    let user: any 
    let url = ''
    const userString = localStorage.getItem('user');
    if (userString) {
      user = JSON.parse(userString);
 
      url = `${this.urlBase}?email=eq.${user[0].email}&password=eq.${user[0].password}`;
    } 
   return this.http.get<User>(url,{headers})
      .pipe(
        tap(user => {
          this.user = user
        }),
        map(user => !!user),
        
        catchError( err => of(false))
    )
    
  }
 

  getUserRole():Observable<string> {
    const currentUser = Array.isArray(this.user) ? this.user[0] : this.user;
    const rol = currentUser.role_name;
    return of(rol);
  }

  onLout(){
    this.user = undefined;
    localStorage.clear();
  }

}
