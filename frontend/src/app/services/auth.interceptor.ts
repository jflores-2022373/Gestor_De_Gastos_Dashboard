import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Opcional: Si quieres adjuntar el token automáticamente a cada petición en el futuro:
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
      // Si el servidor responde con 401 (Unauthorized), significa que el token expiró o es inválido
      if (error.status === 401) {
        alert('Tu sesión ha expirado o no es válida. Por favor, inicia sesión de nuevo.');
        
        // Limpiamos los datos del usuario
        localStorage.clear();
        
        // Redirigimos automáticamente al login
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};