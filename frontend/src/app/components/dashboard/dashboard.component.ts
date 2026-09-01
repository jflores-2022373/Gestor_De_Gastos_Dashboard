import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { 
  Chart, 
  ChartConfiguration, 
  BarController, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  DoughnutController, 
  ArcElement, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { TransactionService, Transaction } from '../../services/transaction.service';
import { AuthService } from '../../services/auth.service';

Chart.register(
  BarController, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  DoughnutController, 
  ArcElement, 
  Tooltip, 
  Legend
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  transactions: Transaction[] = [];

  totalIncome: number = 0;
  totalExpense: number = 0;
  balance: number = 0;

  private expirationTimer: any;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000 },
    scales: {
      x: { ticks: { color: '#ffd700', font: { weight: 500 } }, grid: { color: 'rgba(255, 255, 255, 0.03)' } },
      y: { ticks: { color: '#ffd700', font: { weight: 500 } }, grid: { color: 'rgba(255, 255, 255, 0.03)' } }
    },
    plugins: { legend: { display: false } }
  };

  public barChartData: ChartConfiguration['data'] = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#00C851', '#ff4444'],
      borderRadius: 6
    }]
  };

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  public doughnutChartData: ChartConfiguration['data'] = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [{
      data: [1, 1],
      backgroundColor: ['#00C851', '#ff4444'],
      borderWidth: 0
    }]
  };

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTransactions();

    this.expirationTimer = setTimeout(() => {
      window.alert('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
      this.authService.logout(true); 
    }, 4 * 60 * 60 * 1000);
  }

  ngAfterViewInit(): void {
    this.loadTransactions();
  }

  ngOnDestroy(): void {
    if (this.expirationTimer) clearTimeout(this.expirationTimer);
  }

  loadTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data || [];
        this.calculateTotalsAndRefreshCharts();
        this.cdr.detectChanges(); // Fuerza a Angular a actualizar la vista de inmediato
      },
      error: (err: any) => {
        console.error('Error al cargar transacciones en el Dashboard', err);
      }
    });
  }

  calculateTotalsAndRefreshCharts() {
    this.totalIncome = this.transactions
      .filter(t => {
        const typeStr = String(t.type || '').toLowerCase();
        return typeStr === 'income' || typeStr === 'ingreso';
      })
      .reduce((acc, t) => {
        const cleanAmount = Number(String(t.amount || 0).replace(/[^0-9.-]+/g, ''));
        return acc + Math.abs(isNaN(cleanAmount) ? 0 : cleanAmount);
      }, 0);

    this.totalExpense = this.transactions
      .filter(t => {
        const typeStr = String(t.type || '').toLowerCase();
        return typeStr === 'expense' || typeStr === 'gasto';
      })
      .reduce((acc, t) => {
        const cleanAmount = Number(String(t.amount || 0).replace(/[^0-9.-]+/g, ''));
        return acc + Math.abs(isNaN(cleanAmount) ? 0 : cleanAmount);
      }, 0);

    this.balance = this.totalIncome - this.totalExpense;

    this.barChartData = {
      ...this.barChartData,
      datasets: [{
        ...this.barChartData.datasets[0],
        data: [this.totalIncome, this.totalExpense]
      }]
    };

    const dIncome = (this.totalIncome === 0 && this.totalExpense === 0) ? 1 : this.totalIncome;
    const dExpense = (this.totalIncome === 0 && this.totalExpense === 0) ? 1 : this.totalExpense;
    
    this.doughnutChartData = {
      ...this.doughnutChartData,
      datasets: [{
        ...this.doughnutChartData.datasets[0],
        data: [dIncome, dExpense]
      }]
    };
  }

  logout() {
    this.authService.logout(false);
  }
}