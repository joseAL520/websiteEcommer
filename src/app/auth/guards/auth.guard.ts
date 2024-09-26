import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})


export class AuthGuardService implements CanMatch{

    

    constructor(
        private  authService: AuthService,
        private router: Router
    ) { }


    // private checkAuthStatus():boolean | Observable<boolean>{
    //     return this.authService.checkAuthentication()
    //         .pipe(
    //             tap( isAuthentication => {
    //                 if( !isAuthentication){
    //                     this.router.navigate(['/ecommer/eco']);
    //                 }
    //             })
    //         )
    // }


    

    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> {
        const allowedRoles = route.data?.['alloweRol'] as Array<string>;
    
        return this.authService.getUserRole().pipe(
            map((userRole) => {
              if (allowedRoles.includes(userRole)) {
                return true;
              } else {
                this.router.navigate(['/ecommer/eco']);
                return false;
              }
            })
          );


    }
    
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean | Observable<boolean> {
    //     // console.log('cantActive', route, state)
    //     // throw new Error('Method not implemented.');

    //     return this.checkAuthStatus();
    // }
    
}