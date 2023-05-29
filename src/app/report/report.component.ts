import { Component, OnInit } from '@angular/core';
import { Expense } from '../expense.model';
import { ExpenseService } from '../expense.service';

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
  userId:string;
  constructor(private expenseService:ExpenseService) { }

  ngOnInit(): void {
    this.onFetchData();
  }

  onFetchData(){
    this.userId='swt';//hardcode userid
    this.expenseService.fetchReport(this.userId,'expense').subscribe(
      data =>{
        this.listExpense = data;
      }
    );
    this.expenseService.fetchReport(this.userId,'income').subscribe(
      data =>{
        this.listIncome = data;
      }
    );
  }

  filterData(){

  }

}
