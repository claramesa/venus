import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ApiServiceProvider } from './provider/api-service/api-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private api:ApiServiceProvider, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   const tokenLocal = localStorage.getItem('user_token');

   if(tokenLocal!=null){
   return  this.api.validToken(tokenLocal).pipe(
     map((dataServer:any)=>{
      if(dataServer.token === tokenLocal){
        return true;
      }else{
        localStorage.removeItem('user_token');
        this.router.navigate(['/login']);
        return false;
      }

     })

    );
  }else{
    this.router.navigate(['/login']);
    return false;
  }
      }
  
}
