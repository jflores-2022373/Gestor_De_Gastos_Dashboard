import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Revisa si el token guardado en el login existe
  const token = localStorage.getItem('token');

  if (token) {
    return true; // ¡Permite el paso al dashboard!
  } else {
    // Si no hay token, lo patea de vuelta al login
    router.navigate(['/login']);
    return false;
  }
};