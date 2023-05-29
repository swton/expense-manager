import { Component, OnInit } from '@angular/core';
import { Expense } from '../../model/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  listExpense:{category:string,expense:Expense[]}[]=[];
  listIncome:{category:string,expense:Expense[]}[]=[];
  fromDate:Date = new Date();
  toDate:Date = new Date();
  constructor(private expenseService:ExpenseService) { }

  ngOnInit(): void {
    this.onFetchData();
  }

  onFetchData(){
    this.expenseService.fetchReport('expense').subscribe(
      data =>{
        this.listExpense = data;
      }
    );
    this.expenseService.fetchReport('income').subscribe(
      data =>{
        this.listIncome = data;
      }
    );
  }

  filterData(){

  }

}
