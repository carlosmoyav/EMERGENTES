import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LibroGuardService {

  constructor(private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = route.url[1].path;
    console.log(route.url);
    if (id.length <= 0) {
      alert('Error al buscar el Id');
      this._router.navigate(['/libros']);
      return false;
    }

    return true;

  }
}
