import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router, 
    private loginService: LoginService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (!this.loginService.isUserLogado())  {     
      this.router.navigate(['/login'], { queryParams: { nextUrl: url } })
      return false;
    }

    if (!route.data.role) {
      return true
    }

    if (!this.loginService.getRoles()) {
      return false;
    }
    
    const rolesUser = this.loginService.getRoles();
    const rolesRota = route.data.role;

    if (!this.hasCommonElement(rolesUser, rolesRota)) {
      //console.log("RolesUser: "+rolesUser)
      //console.log("RolesRota: "+rolesRota)
      return false;      
    }

    return true;
  }

  hasCommonElement(rolesUser: string[], rolesRota: string[]) {
    return rolesUser.some(roleUser => rolesRota.includes(roleUser));
  }

}
