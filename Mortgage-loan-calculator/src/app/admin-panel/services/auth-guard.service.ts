import {StorageService} from "../../admin-login/services/storage.service";
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {

  constructor(private _router: Router, private storageService: StorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuth(route, state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuth(childRoute, state);
  }

  private checkAuth(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Check if user is logged in
    if (!this.storageService.isLoggedIn()) {
      alert('You are not logged in');
      return this._router.parseUrl('/adminlogin');
    } else {
      // Check if user has the right role
      if (!this.storageService.getUser().roles.includes('ROLE_ADMIN')) {
        alert('You do not have the right role');
        return this._router.parseUrl('/adminlogin');
      }
      return true;
    }
  }
}
