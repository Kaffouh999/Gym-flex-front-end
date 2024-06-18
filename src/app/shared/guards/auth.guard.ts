import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      console.log("inside authenticated res = "+this.authService.isLoggedIn());
      return true;
    } else {
      this.router.navigate(['/web/login']);
      this.authService.logout();
      console.log("noooooot authenticated")
      return false;
    }
  }
}