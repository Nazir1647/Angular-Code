import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {

    if (this.authService.isLoggedIn()) {

      const userRole = this.authService.getRole();
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        alert("You have not authorized to access this role");
        return false;
      }
      return true;
    }

    this.router.navigate(['/signin']);
    return false;
  }

}
