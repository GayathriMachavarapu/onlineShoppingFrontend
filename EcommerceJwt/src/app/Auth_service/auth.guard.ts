import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_Services/user-auth.service';
import { JwtserviceService } from '../_Services/jwtservice.service';
@Injectable({
  providedIn:'root'
})

 export class AuthsGuard {
  // constructor(private userAuthService:UserAuthService,
  //   private router:Router,
  //   private jwtService:JwtserviceService
  //   ){}
  // canActivate(route: ActivatedRouteSnapshot, 
  //   state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  //     if (this.userAuthService.getToken() !== null) {
  //       const role = route.data['roles'] as Array<string>;
  
  //       if (role) {
  //         const match = this.jwtService.roleMatch(role);
  
  //         if (match) {
  //           return true;
  //         } else {
  //            this.router.navigate(['/forbidden']);
  //           return false;
  //         }
  //       }
  //     }
  
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: JwtserviceService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userAuthService.getToken() !== null) {
      const role = route.data['roles'] as Array<string>;

      if (role) {
        const match = this.userService.roleMatch(role);

        if (match) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
  
}
 export const authGuard:CanActivateFn=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>=> {
  return inject(AuthsGuard).canActivate(route,state);
 }
  
