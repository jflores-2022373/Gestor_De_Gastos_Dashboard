import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TransactionService, Transaction } from '../../services/transaction.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  newTransaction: Transaction = {
    title: '',
    amount: 0,
    type: 'expense',
    category: 'Alimentación'
  };

  categories: string[] = [
    'Alimentación',
    'Transporte',
    'Vivienda / Alquiler',
    'Servicios Básicos (Luz, Agua)',
    'Entretenimiento',
    'Salud y Farmacia',
    'Educación',
    'Salario / Ingresos',
    'Inversiones',
    'Otros'
  ];

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data || [];
      },
      error: (err) => {
        console.error('Error al cargar transacciones', err);
        this.errorMessage = 'No se pudieron cargar las transacciones.';
      }
    });
  }

  addTransaction() {
    if (!this.newTransaction.title || this.newTransaction.amount <= 0) {
      this.errorMessage = 'Por favor completa la descripción y un monto válido.';
      this.successMessage = '';
      return;
    }

    this.transactionService.createTransaction(this.newTransaction).subscribe({
      next: () => {
        this.successMessage = '¡Transacción registrada con éxito!';
        this.errorMessage = '';
        this.newTransaction = { title: '', amount: 0, type: 'expense', category: 'Alimentación' };
        this.loadTransactions();
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Error al guardar la transacción';
        this.successMessage = '';
      }
    });
  }

  deleteTransaction(id: string | undefined) {
    if (!id) {
      this.errorMessage = 'ID de transacción no válido.';
      return;
    }

    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        this.successMessage = 'Transacción eliminada con éxito';
        this.errorMessage = '';
        this.loadTransactions();
      },
      error: (err: any) => {
        console.error('Error al eliminar:', err);
        this.errorMessage = err.error?.message || 'Error al eliminar la transacción';
        this.successMessage = '';
      }
    });
  }

  logout() {
    this.authService.logout(false);
  }
}