import { Injectable } from "@angular/core";

import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../shared/auth.service";

@Injectable()

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): boolean {
    if(this.authService.userSignedIn()){
      return true
    }else{
      this.router.navigate(['/sign-in'])
      return false
    }
  }
}
