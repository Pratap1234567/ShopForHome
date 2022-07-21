import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/_Services/auth.service';
import { RestService } from 'src/_Services/rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: RestService, private Authservice: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.Authservice.getToken() !== null) {
      const role = route.data['role'] as string;

      if (role) {
        const match = this.service.rolematch(role);

        if (match) {
          return true;
        } else {
          this.router.navigate(['forbidden'])
          return false;
        }
      }
    }
    this.router.navigate(['login'])
    return false;
  }

}
