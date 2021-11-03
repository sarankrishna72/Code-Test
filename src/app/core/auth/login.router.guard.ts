import {
  Injectable
} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import {
  Observable
} from 'rxjs';
import {
  AuthService
} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRouterGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {
      console.log(this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/user']);
    } else {
      return true;
    }
  }

}
