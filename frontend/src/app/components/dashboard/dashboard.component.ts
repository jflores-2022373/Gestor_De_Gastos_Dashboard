import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionService, Transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];

  newTransaction: Transaction = {
    title: '',
    amount: 0,
    type: 'expense',
    category: 'General'
  };

  errorMessage: string = '';
  successMessage: string = '';

  totalIncome: number = 0;
  totalExpense: number = 0;
  balance: number = 0;

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.calculateTotals();
      },
      error: (err: any) => {
        console.error('Error al cargar transacciones', err);
        this.errorMessage = 'No se pudieron cargar las transacciones.';
      }
    });
  }

  calculateTotals() {
    this.totalIncome = this.transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    this.totalExpense = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    this.balance = this.totalIncome - this.totalExpense;
  }

  addTransaction() {
    if (!this.newTransaction.title || this.newTransaction.amount <= 0) {
      this.errorMessage = 'Por favor completa el título y un monto válido.';
      this.successMessage = '';
      return;
    }

    this.transactionService.createTransaction(this.newTransaction).subscribe({
      next: () => {
        this.successMessage = 'Transacción agregada con éxito';
        this.errorMessage = '';
        this.newTransaction = { title: '', amount: 0, type: 'expense', category: 'General' };
        this.loadTransactions();
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Error al guardar la transacción';
        this.successMessage = '';
      }
    });
  }

  deleteTransaction(id: string | undefined) {
    if (!id) return;

    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        this.successMessage = 'Transacción eliminada con éxito';
        this.errorMessage = '';
        this.loadTransactions();
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Error al eliminar la transacción';
        this.successMessage = '';
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}