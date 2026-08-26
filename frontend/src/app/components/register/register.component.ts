import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.credentials).subscribe({
      next: () => {
        this.successMessage = '¡Registro exitoso! Redirigiendo al login...';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']); // Te devuelve al login tras registrarte
        }, 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar el usuario';
        this.successMessage = '';
      }
    });
  }
}