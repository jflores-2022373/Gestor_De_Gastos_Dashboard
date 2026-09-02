import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TransactionService, Transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  
  transaction: Transaction = {
    type: 'Gasto',
    description: '',
    amount: 0,
    category: 'Alimentación'
  };

  isEditMode: boolean = false;
  selectedCategoryFilter: string = '';

  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (err: any) => {
        console.error('Error al cargar transacciones', err);
        this.showToastMessage('Error al cargar las transacciones', 'error');
      }
    });
  }

  onTypeChange(): void {
    if (this.transaction.type === 'Gasto') {
      this.transaction.category = 'Alimentación';
    } else {
      this.transaction.category = 'Salario';
    }
  }

  saveTransaction(): void {
    if (!this.transaction.description || !this.transaction.amount) {
      this.showToastMessage('Por favor completa todos los campos', 'error');
      return;
    }

    if (this.isEditMode && this.transaction.id) {
      this.transactionService.updateTransaction(this.transaction.id, this.transaction).subscribe({
        next: () => {
          this.loadTransactions();
          this.resetForm();
          this.showToastMessage('Transacción actualizada correctamente', 'success');
        },
        error: (err: any) => {
          console.error('Error al actualizar', err);
          this.showToastMessage('No se pudo actualizar el movimiento', 'error');
        }
      });
    } else {
      this.transactionService.createTransaction(this.transaction).subscribe({
        next: () => {
          this.loadTransactions();
          this.resetForm();
          this.showToastMessage('Transacción registrada correctamente', 'success');
        },
        error: (err: any) => {
          console.error('Error al crear', err);
          this.showToastMessage('No se pudo registrar el movimiento', 'error');
        }
      });
    }
  }

  editTransaction(t: Transaction): void {
    this.isEditMode = true;
    this.transaction = { ...t };
  }

  resetForm(): void {
    this.isEditMode = false;
    this.transaction = {
      type: 'Gasto',
      description: '',
      amount: 0,
      category: 'Alimentación'
    };
  }

  deleteTransaction(id: any): void {
    if (id !== undefined && id !== null) {
      const numId = Number(id);
      this.transactionService.deleteTransaction(numId).subscribe({
        next: () => {
          this.loadTransactions();
          this.showToastMessage('Transacción eliminada correctamente', 'success');
        },
        error: (err: any) => {
          console.error('Error al eliminar', err);
          this.showToastMessage('No se pudo eliminar el movimiento', 'error');
        }
      });
    }
  }

  showToastMessage(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3500);
  }

  get totalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'Ingreso')
      .reduce((acc, t) => acc + t.amount, 0);
  }

  get totalExpense(): number {
    return this.transactions
      .filter(t => t.type === 'Gasto')
      .reduce((acc, t) => acc + t.amount, 0);
  }

  get netBalance(): number {
    return this.totalIncome - this.totalExpense;
  }

  get filteredTransactions(): Transaction[] {
    if (!this.selectedCategoryFilter) {
      return this.transactions;
    }
    return this.transactions.filter(t => t.category === this.selectedCategoryFilter);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}