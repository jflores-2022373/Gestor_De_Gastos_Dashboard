import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { TransactionService, Transaction } from '../../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  transactions: Transaction[] = [];
  
  totalIncome: number = 0;
  totalExpense: number = 0;
  netBalance: number = 0;
  showExpirationModal: boolean = false;

  doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  doughnutChartData: ChartConfiguration['data'] = {
    labels: ['Ingresos', 'Gastos'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#ffcc00', '#1c1c24']
      }
    ]
  };

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  barChartData: ChartConfiguration['data'] = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0],
        label: 'Transacciones',
        backgroundColor: '#ffcc00'
      }
    ]
  };

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.calculateMetrics();
        this.updateCharts();
      },
      error: (err: any) => {
        console.error('Error al cargar transacciones en el dashboard', err);
      }
    });
  }

  calculateMetrics(): void {
    this.totalIncome = this.transactions
      .filter(t => t.type === 'Ingreso')
      .reduce((acc, t) => acc + t.amount, 0);

    this.totalExpense = this.transactions
      .filter(t => t.type === 'Gasto')
      .reduce((acc, t) => acc + t.amount, 0);

    this.netBalance = this.totalIncome - this.totalExpense;
  }

  get balance(): number {
    return this.netBalance;
  }

  updateCharts(): void {
    this.doughnutChartData = {
      labels: ['Ingresos', 'Gastos'],
      datasets: [
        {
          data: [this.totalIncome, this.totalExpense],
          backgroundColor: ['#ffcc00', '#1c1c24']
        }
      ]
    };
  }

  onModalOk(): void {
    this.showExpirationModal = false;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}