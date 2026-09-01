import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Adjunta el token automáticamente a cada petición si existe
  const token = localStorage.getItem('token');
  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedReq).pipe(
    catchError((error) => {
      // Si el servidor responde con 401, lo registramos en consola pero no bloqueamos tu flujo de trabajo
      if (error.status === 401) {
        console.warn('Petición rechazada con 401 Unauthorized (alerta desactivada temporalmente)');
        
        // ALERT Y REDIRECCIÓN DESACTIVADAS TEMPORALMENTE:
        // alert('Tu sesión ha expirado o no es válida. Por favor, inicia sesión de nuevo.');
        // localStorage.clear();
        // router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};