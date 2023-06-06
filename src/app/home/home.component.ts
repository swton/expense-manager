import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/services/expense.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private expenseService:ExpenseService) { }
  totalIncome;
  totalExpense;
  ngOnInit(): void {
    this.onFetchData();
  }

  onFetchData(){
    this.expenseService.fetchPosts('expense').subscribe(
      data =>{
        this.totalExpense = this.expenseService.getTotalAmount(data);
      }
    );

    this.expenseService.fetchPosts('income').subscribe(
      data =>{
        this.totalIncome = this.expenseService.getTotalAmount(data);
      }
    );
  }

}
